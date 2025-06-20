import { AppDataSource } from "../../ormconfig";
import { Contact } from "../../entities/contact/Contact";
import { FindOptionsWhere } from "typeorm";

export class ContactService {
  private contactRepository = AppDataSource.getRepository(Contact);

  async identifyContact(email?: string, phoneNumber?: string) {
    if (!email && !phoneNumber) {
      throw new Error("At least one of email or phoneNumber must be provided.");
    }

    const whereClause: FindOptionsWhere<Contact>[] = [];
    if (email) whereClause.push({ email });
    if (phoneNumber) whereClause.push({ phoneNumber });

    const matchedContacts = await this.contactRepository.find({
      where: whereClause,
    });

    if (matchedContacts.length === 0) {
      const newContact = this.contactRepository.create({
        email: email ?? null,
        phoneNumber: phoneNumber ?? null,
        linkPrecedence: "primary",
        linkedId: null,
      });

      const saved = await this.contactRepository.save(newContact);
      return this.formatResponse(saved, []);
    }

    const allContacts = await this.contactRepository.find();

    const related = allContacts.filter((c) =>
      matchedContacts.some(
        (mc) =>
          mc.id === c.id ||
          mc.id === c.linkedId ||
          mc.linkedId === c.id ||
          (mc.linkedId && mc.linkedId === c.linkedId)
      )
    );

    const primary = [...related]
      .filter((c) => c.linkPrecedence === "primary")
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

    const secondariesToUpdate = related.filter(
      (c) => c.linkPrecedence === "primary" && c.id !== primary.id
    );

    if (secondariesToUpdate.length > 0) {
      const ids = secondariesToUpdate.map((c) => c.id);
      await this.contactRepository.update(ids, {
        linkPrecedence: "secondary",
        linkedId: primary.id,
      });
    }

    const finalContacts = await this.contactRepository.find({
      where: [{ linkedId: primary.id }, { id: primary.id }],
    });

    const isEmailPresent = email
      ? finalContacts.some((c) => c.email === email)
      : true;
    const isPhonePresent = phoneNumber
      ? finalContacts.some((c) => c.phoneNumber === phoneNumber)
      : true;

    if (!isEmailPresent || !isPhonePresent) {
      const newSecondary = this.contactRepository.create({
        email: email ?? null,
        phoneNumber: phoneNumber ?? null,
        linkPrecedence: "secondary",
        linkedId: primary.id,
      });
      const saved = await this.contactRepository.save(newSecondary);
      finalContacts.push(saved);
    }

    return this.formatResponse(primary, finalContacts);
  }

  private formatResponse(primary: Contact, contacts: Contact[]) {
    const primaryId = primary.id;

    const emails = Array.from(
      new Set(
        contacts
          .map((c) => c.email)
          .concat(primary.email)
          .filter((e): e is string => !!e)
      )
    );

    const phoneNumbers = Array.from(
      new Set(
        contacts
          .map((c) => c.phoneNumber)
          .concat(primary.phoneNumber)
          .filter((p): p is string => !!p)
      )
    );

    const linkedContactIds = contacts
      .filter((c) => c.id !== primaryId)
      .map((c) => c.id);

    return {
      contact: {
        primaryContactId: primaryId,
        emails,
        phoneNumbers,
        linkedContactIds,
      },
    };
  }
}
