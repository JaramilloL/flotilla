import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10, dictionary: "number" });
export const id = uid.randomUUID();