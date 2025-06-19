import { AppDataSource } from "../../ormconfig";
import { Contact } from "../../entities/contact/Contact";
import { FindOptionsWhere } from "typeorm";

export class ContactService {
  private contactRepository = AppDataSource.getRepository(Contact);

  /**
   * Identifies and links contact information (email, phone) under a primary identity.
   */
  async identifyContact(email?: string, phoneNumber?: string) {
    if (!email && !phoneNumber) {
      throw new Error("At least one of email or phoneNumber must be provided.");
    }

    try {
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

      const primaryContacts = matchedContacts.filter(
        (c) => c.linkPrecedence === "primary"
      );

      const primary = primaryContacts.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      )[0];

      const allRelated = await this.contactRepository.find({
        where: [{ linkedId: primary.id }, { id: primary.id }],
      });

      // Check if email or phone already exists among related
      const alreadyExists = allRelated.find(
        (c) => c.email === email || c.phoneNumber === phoneNumber
      );

      if (!alreadyExists) {
        // Create new secondary contact linked to primary
        const newLinkedContact = this.contactRepository.create({
          email: email ?? null,
          phoneNumber: phoneNumber ?? null,
          linkPrecedence: "secondary",
          linkedId: primary.id,
        });

        const saved = await this.contactRepository.save(newLinkedContact);
        allRelated.push(saved);
      }

      return this.formatResponse(primary, allRelated);
    } catch (error) {
      console.error("❌ Error identifying contact:", error);
      throw new Error("Something went wrong while identifying the contact.");
    }
  }

  /**
   * Formats the unified contact response
   */
  private formatResponse(primary: Contact, contacts: Contact[]) {
    const primaryId = primary.id;

    const emails = Array.from(
      new Set(
        contacts
          .map((c) => c.email)
          .concat(primary.email)
          .filter((e): e is string => e !== null)
      )
    );

    const phoneNumbers = Array.from(
      new Set(
        contacts
          .map((c) => c.phoneNumber)
          .concat(primary.phoneNumber)
          .filter((p): p is string => p !== null)
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
