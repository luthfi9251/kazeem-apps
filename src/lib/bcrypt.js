import bcrypt from "bcrypt";

export function hashPassword(string) {
    return bcrypt.hashSync(string, 10);
}

export function comparePassword(plainPassword, hash) {
    return bcrypt.compareSync(plainPassword, hash);
}
