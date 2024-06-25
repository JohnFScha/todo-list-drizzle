DO $$ BEGIN
 CREATE TYPE "public"."enum_Contracts_operationType" AS ENUM('sale', 'rent', 'tempRent', 'salePost', 'rentPost');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Contracts_status" AS ENUM('template', 'pending', 'signed', 'canceled', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Contracts_type" AS ENUM('fisico', 'signature');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Cupons_status" AS ENUM('Active', 'Deleted', 'Paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_DraftAlquilers_status" AS ENUM('Aprobado', 'Pendiente', 'En evaluación', 'Rechazado', 'Listo para firmar');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Payments_paymentMethod" AS ENUM('mercadopago', 'black', 'financiación black');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Payments_status" AS ENUM('approved', 'cancelled', 'pending');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Payments_type" AS ENUM('Fees', 'Reservation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Posts_status" AS ENUM('Active', 'Paused', 'Deleted', 'Pendiente', 'Denegada');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Posts_type" AS ENUM('alquiler', 'venta', 'temporal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Properties_hostingType" AS ENUM('Alojamiento entero', 'Una habitación', 'Habitación compartida');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Properties_propertyStatus" AS ENUM('En construcción', 'A estrenar', 'Bueno', 'Muy bueno', 'Excelente', 'Reciclado', 'A restaurar', 'Otro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tasks_category" AS ENUM('Motivo de consulta');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tasks_description" AS ENUM('Solicitud de Publicación para Venta', 'Solicitud de Publicación para Alquiler', 'Solicitud de Publicación para Temporal', 'Solicitud de Alquiler', 'Solicitud de Venta', 'Baja de Usuario', 'Alta de Usuario', 'Enviar dinero al Propietario por mes de alquiler', 'Enviar dinero al Anfitrión reserva alquiler temporal aceptada', 'Enviar dinero de reserva de venta al propietario', 'Devolución de dinero al Inquilino', 'Devolución de dinero al Huésped reserva temporal denegada', 'Devolución de dinero al Comprador reserva de venta denegada', 'Responder Consulta de Publicación', 'Responder Ticket', 'Solicitud de Actualizacion de Cuota de Alquiler', 'Solicitud de Baja de Contrato', 'Entrega de Llaves de Inmueble', 'Reporte de Publicación-Usuario', 'Notificación de Compra de Garantia', 'Solicitud de adhesión de Representante', 'Pago a propietarios de morosos con garantia trustfund', 'Solicitud de reserva de alquiler temporal', 'Solicitud de reporte Publicación', 'Solicitud de financiación de honorarios de alquiler', 'Otro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tasks_status" AS ENUM('Pendiente', 'A revisar', 'Revisada', 'Finalizada');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tickets_category" AS ENUM('Consulta', 'Procesos', 'Reclamos');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tickets_description" AS ENUM('Consultas', 'Consulta de Publicación', 'Entrega de llaves de inmueble', 'Reclamos', 'Actualización de cuota de alquiler', 'Baja de contrato', 'Coordinar Hospedaje', 'Coordinar venta entre interesados', 'Otro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Tickets_state" AS ENUM('Abierto', 'Cerrado');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Users_type" AS ENUM('Admin', 'Agente', 'User', 'Inmobiliaria', 'Locked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."enum_Users_userState" AS ENUM('Active', 'Delete', 'Inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Barrios" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"LocalidadId" uuid,
	"ProvinciumId" uuid,
	"ProvinciaBarrioId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContractTypes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contractType" varchar(255) NOT NULL,
	"data" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "ContractTypes_contractType_key" UNIQUE("contractType")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Contracts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"contractTypeId" varchar(255) NOT NULL,
	"type" "enum_Contracts_type" NOT NULL,
	"operationType" "enum_Contracts_operationType" NOT NULL,
	"operationId" varchar(255),
	"postId" varchar(255),
	"contractId" varchar(255),
	"url" varchar(255),
	"status" "enum_Contracts_status" NOT NULL,
	"propertyOwnerId" varchar(255) NOT NULL,
	"tenantId" varchar(255),
	"signWithFlexy" boolean DEFAULT false,
	"initDate" varchar(255),
	"endDate" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Cupons" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"expiration" timestamp with time zone NOT NULL,
	"amount" integer,
	"percent" varchar(255),
	"totalApplications" integer,
	"status" "enum_Cupons_status" DEFAULT 'Active',
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Favorites" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"idPublicacion" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"UserId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "KitepropSeguimientos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"kitepropId" integer,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Localidads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"PartidoId" uuid,
	"ProvinciumId" uuid,
	"ProvinciaLocalidadId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MercadopagoNotifications" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"topic" varchar(255) NOT NULL,
	"dataId" varchar(255) NOT NULL,
	"authorization" varchar(255),
	"externalReference" varchar(255),
	"additionalInfo" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Messages" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"ticketId" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"sender" varchar(255),
	"watched" boolean DEFAULT false,
	"reminders" boolean DEFAULT false,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Packs" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Partidos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"SubProvinciumId" uuid,
	"ProvinciumId" uuid,
	"ProvinciaPartidoId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Payments" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"preferenceId" varchar(255) NOT NULL,
	"collectionId" varchar(255) NOT NULL,
	"paymentId" varchar(255) NOT NULL,
	"paymentLink" varchar(255),
	"price" double precision NOT NULL,
	"priceWithDiscount" double precision,
	"status" "enum_Payments_status" NOT NULL,
	"type" "enum_Payments_type",
	"paymentMethod" "enum_Payments_paymentMethod" NOT NULL,
	"pendingStatusNotified" boolean DEFAULT false,
	"expirationDate" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"packId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Posts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"owner" varchar(255) NOT NULL,
	"property" varchar(255) NOT NULL,
	"type" "enum_Posts_type" NOT NULL,
	"publicationType" varchar(255),
	"currency" varchar(255) DEFAULT 'UF',
	"price" bigint NOT NULL,
	"cleaningFee" bigint,
	"expenseTypes" varchar(255),
	"expenseCurrency" varchar(255) DEFAULT 'UF',
	"expensePrice" bigint,
	"finance" boolean,
	"disponibilidad" text[],
	"specificPrices" text[],
	"periodo" varchar(255),
	"garantia" varchar(255)[],
	"authorization" varchar(255)[],
	"minimum_days" boolean,
	"amount_minimum_days" integer,
	"status" "enum_Posts_status",
	"periodoAumento" varchar(255),
	"cbu" varchar(255),
	"visits" integer,
	"kitepropId" integer,
	"kitepropLastUpdate" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone,
	"ContractId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Properties" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"owner" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"typeProp" varchar(255) NOT NULL,
	"street" text NOT NULL,
	"intersectionOne" varchar(255) NOT NULL,
	"intersectionTwo" varchar(255),
	"pais" varchar(255) NOT NULL,
	"province" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"barrio" varchar(255),
	"postalCode" varchar(255),
	"number" text NOT NULL,
	"piso" varchar(255),
	"depto" varchar(255),
	"lat" varchar(255) NOT NULL,
	"long" varchar(255) NOT NULL,
	"video" varchar(255)[],
	"plane" varchar(255)[],
	"deed" varchar(255)[],
	"mainImage" varchar(255),
	"multimedia" varchar(255)[],
	"propertyStatus" "enum_Properties_propertyStatus",
	"ambient" bigint,
	"bedroom" bigint,
	"bathroom" bigint,
	"beds" bigint,
	"travellersCapacity" bigint,
	"surface" bigint,
	"mCovered" bigint,
	"antiquity" varchar(255),
	"generalAttributes" varchar(255)[],
	"typesAmbients" varchar(255)[],
	"services" varchar(255)[],
	"facilities" varchar(255)[],
	"securityItems" varchar(255)[],
	"quickDescription" varchar(255)[],
	"disponibilidad" varchar(255),
	"hostingType" "enum_Properties_hostingType",
	"documents" varchar(255)[],
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PropertyTypes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) DEFAULT 'housing',
	"applications" varchar(255)[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Provincia" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SubProvincia" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"ProvinciumId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tasks" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"taskNum" serial NOT NULL,
	"description" "enum_Tasks_description" NOT NULL,
	"assignedOffice" varchar(255),
	"status" "enum_Tasks_status",
	"objectId" varchar(255),
	"initiator" varchar(255),
	"contraparte" varchar(255),
	"contract" varchar(255),
	"category" "enum_Tasks_category",
	"asunto" varchar(255),
	"priority" varchar(255),
	"document" varchar(255)[],
	"reasonForResolution" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "Tasks_taskNum_key" UNIQUE("taskNum")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tickets" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"ticketNum" serial NOT NULL,
	"description" "enum_Tickets_description" NOT NULL,
	"assignedOffice" varchar(255),
	"state" "enum_Tickets_state" DEFAULT 'Abierto',
	"objectId" varchar(255),
	"initiator" varchar(255) NOT NULL,
	"counterpart" varchar(255),
	"watched" boolean DEFAULT false,
	"contract" varchar(255),
	"category" "enum_Tickets_category",
	"priority" varchar(255),
	"document" varchar(255)[],
	"reasonForResolution" varchar(255),
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserCupons" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"cuponId" varchar(255) NOT NULL,
	"usedAt" timestamp with time zone,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone,
	"UserId" varchar(255),
	"CuponId" varchar(255),
	CONSTRAINT "UserCupons_UserId_CuponId_key" UNIQUE("UserId","CuponId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastname" varchar(255),
	"inmobiliaria" varchar(255),
	"imagen_profile" text,
	"type" "enum_Users_type",
	"street" text,
	"number" varchar(255),
	"intersectionOne" varchar(255),
	"intersectionTwo" varchar(255),
	"piso" varchar(255),
	"depto" varchar(255),
	"pais" varchar(255),
	"provincia" varchar(255),
	"partido_localidad" varchar(255),
	"city" varchar(255),
	"phone" varchar(255),
	"dni" integer,
	"cuilcuit" bigint,
	"cbu" varchar(255),
	"postal_code" varchar(255),
	"dni_frente" varchar(255)[],
	"dni_dorso" varchar(255)[],
	"imgBiometrica" varchar(255),
	"recibo" varchar(255),
	"garantia" varchar(255),
	"verified_data" boolean DEFAULT false,
	"password" varchar(255),
	"email" varchar(255) NOT NULL,
	"isInquilino" boolean,
	"isPropietario" boolean,
	"resetLink" varchar(255) DEFAULT '',
	"userState" "enum_Users_userState",
	"googleId" varchar(255),
	"rol" varchar(255),
	"location" varchar(255),
	"create" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone,
	CONSTRAINT "Users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VariableEditorTexts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_packs" (
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"UserId" varchar(255) NOT NULL,
	"PackId" varchar(255) NOT NULL,
	CONSTRAINT "user_packs_pkey" PRIMARY KEY("UserId","PackId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_tasks" (
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"TaskId" varchar(255) NOT NULL,
	"UserId" varchar(255) NOT NULL,
	CONSTRAINT "user_tasks_pkey" PRIMARY KEY("TaskId","UserId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Barrios" ADD CONSTRAINT "Barrios_LocalidadId_Localidads_id_fk" FOREIGN KEY ("LocalidadId") REFERENCES "public"."Localidads"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Barrios" ADD CONSTRAINT "Barrios_ProvinciumId_Provincia_id_fk" FOREIGN KEY ("ProvinciumId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Barrios" ADD CONSTRAINT "Barrios_ProvinciaBarrioId_Provincia_id_fk" FOREIGN KEY ("ProvinciaBarrioId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_contractTypeId_ContractTypes_id_fk" FOREIGN KEY ("contractTypeId") REFERENCES "public"."ContractTypes"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_propertyOwnerId_Users_id_fk" FOREIGN KEY ("propertyOwnerId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_tenantId_Users_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_UserId_Users_id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Localidads" ADD CONSTRAINT "Localidads_PartidoId_Partidos_id_fk" FOREIGN KEY ("PartidoId") REFERENCES "public"."Partidos"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Localidads" ADD CONSTRAINT "Localidads_ProvinciumId_Provincia_id_fk" FOREIGN KEY ("ProvinciumId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Localidads" ADD CONSTRAINT "Localidads_ProvinciaLocalidadId_Provincia_id_fk" FOREIGN KEY ("ProvinciaLocalidadId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Messages" ADD CONSTRAINT "Messages_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."Tickets"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_Users_id_fk" FOREIGN KEY ("sender") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Partidos" ADD CONSTRAINT "Partidos_SubProvinciumId_SubProvincia_id_fk" FOREIGN KEY ("SubProvinciumId") REFERENCES "public"."SubProvincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Partidos" ADD CONSTRAINT "Partidos_ProvinciumId_Provincia_id_fk" FOREIGN KEY ("ProvinciumId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Partidos" ADD CONSTRAINT "Partidos_ProvinciaPartidoId_Provincia_id_fk" FOREIGN KEY ("ProvinciaPartidoId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Payments" ADD CONSTRAINT "Payments_paymentId_Packs_id_fk" FOREIGN KEY ("paymentId") REFERENCES "public"."Packs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Payments" ADD CONSTRAINT "Payments_packId_Packs_id_fk" FOREIGN KEY ("packId") REFERENCES "public"."Packs"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_owner_Users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_property_Properties_id_fk" FOREIGN KEY ("property") REFERENCES "public"."Properties"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Posts" ADD CONSTRAINT "Posts_ContractId_Contracts_id_fk" FOREIGN KEY ("ContractId") REFERENCES "public"."Contracts"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Properties" ADD CONSTRAINT "Properties_owner_Users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Properties" ADD CONSTRAINT "Properties_typeProp_PropertyTypes_id_fk" FOREIGN KEY ("typeProp") REFERENCES "public"."PropertyTypes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SubProvincia" ADD CONSTRAINT "SubProvincia_ProvinciumId_Provincia_id_fk" FOREIGN KEY ("ProvinciumId") REFERENCES "public"."Provincia"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_assignedOffice_Users_id_fk" FOREIGN KEY ("assignedOffice") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_initiator_Users_id_fk" FOREIGN KEY ("initiator") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_counterpart_Users_id_fk" FOREIGN KEY ("counterpart") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserCupons" ADD CONSTRAINT "UserCupons_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserCupons" ADD CONSTRAINT "UserCupons_cuponId_Cupons_id_fk" FOREIGN KEY ("cuponId") REFERENCES "public"."Cupons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserCupons" ADD CONSTRAINT "UserCupons_UserId_Users_id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserCupons" ADD CONSTRAINT "UserCupons_CuponId_Cupons_id_fk" FOREIGN KEY ("CuponId") REFERENCES "public"."Cupons"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_packs" ADD CONSTRAINT "user_packs_UserId_Users_id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_packs" ADD CONSTRAINT "user_packs_PackId_Packs_id_fk" FOREIGN KEY ("PackId") REFERENCES "public"."Packs"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_TaskId_Tasks_id_fk" FOREIGN KEY ("TaskId") REFERENCES "public"."Tasks"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_UserId_Users_id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_cupons_user_id_cupon_id" ON "UserCupons" USING btree ("userId","cuponId");