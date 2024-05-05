import bcrypt from "bcrypt";

export function hashPassword(string) {
    return bcrypt.hashSync(string, 10);
}
