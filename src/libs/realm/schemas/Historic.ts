import { index, Object } from "realm";

export class Historic extends Object<Historic> {
  static generate() {}

  static schema = {
    name: "Historic",
    primaryKey: "_id",

    properties: {
      _id: "uuid",
      user_id: {
        type: "string",
        indexed: true,
      },
      license_plate: "string",
      description: "string",
      status: "string",
      create_at: "date",
      update_at: "date",
    },
  };
}
