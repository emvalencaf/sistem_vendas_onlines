import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRootInUser1682911356216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
				INSERT INTO public."user"(
					name, email, cpf, type_user, phone, password)
					VALUES ('root', 'root@root.com', '12345678901', 2, '31925325252', '$2b$10$iwP4s3pGqn7U.BVQhXbInuF.Zh7ZU1HoAsNK9CZRA23cj0xnrjyr.');
			`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
				DELETE FROM public."user"
					WHERE email like 'root@root.com';
			`);
  }
}
