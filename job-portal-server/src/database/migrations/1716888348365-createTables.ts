import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1716888348365 implements MigrationInterface {
    name = 'CreateTables1716888348365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`position\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`status\` enum ('Open', 'Closed') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`cv\` text NOT NULL, \`candidateId\` varchar(36) NULL, \`positionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidate\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_56bd5315980a6bcd995a54df8fe\` FOREIGN KEY (\`candidateId\`) REFERENCES \`candidate\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application\` ADD CONSTRAINT \`FK_a9ac77b743a5887297ac2351893\` FOREIGN KEY (\`positionId\`) REFERENCES \`position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_a9ac77b743a5887297ac2351893\``);
        await queryRunner.query(`ALTER TABLE \`application\` DROP FOREIGN KEY \`FK_56bd5315980a6bcd995a54df8fe\``);
        await queryRunner.query(`DROP TABLE \`candidate\``);
        await queryRunner.query(`DROP TABLE \`application\``);
        await queryRunner.query(`DROP TABLE \`position\``);
    }

}
