import { Realm } from "@realm/react";
import { ObjectSchema } from "realm";
import { CoordsSchemaProps } from "./Coords";

type GenerateProps = {
  user_id: string;
  description: string;
  license_plate: string;
  coords: CoordsSchemaProps[];
};

export class Historic extends Realm.Object<Historic> {
  _id!: string;
  user_id!: string;
  license_plate!: string;
  description!: string;
  coords!: CoordsSchemaProps[];
  status!: string;
  create_at!: Date;
  update_at!: Date;

  static generate({
    user_id,
    description,
    license_plate,
    coords,
  }: GenerateProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      description,
      license_plate,
      coords,
      status: "departure",
      create_at: new Date(),
      update_at: new Date(),
    };
  }

  static schema: ObjectSchema = {
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
      coords: {
        type: "list",
        objectType: "Coords",
      },
      status: "string",
      create_at: "date",
      update_at: "date",
    },
  };
}
