-- AlterTable
CREATE SEQUENCE group_id_seq;
ALTER TABLE "Group" ALTER COLUMN "id" SET DEFAULT nextval('group_id_seq');
ALTER SEQUENCE group_id_seq OWNED BY "Group"."id";
