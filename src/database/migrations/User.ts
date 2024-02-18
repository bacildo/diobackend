import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1708209047617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id_user",
            type: "VARCHAR",
            isPrimary: true,
          },
          {
            name: "name",
            type: "VARCHAR",
            isNullable: false,
          },
          {
            name: "email",
            type: "VARCHAR",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "VARCHAR",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
