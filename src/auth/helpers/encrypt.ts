import * as bcrypt from 'bcrypt';
export class ecrypt {
  static async haspassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
  static async decrypt(hash: string, password: string) {
    return bcrypt.compareSync(password, hash);
  }
}
