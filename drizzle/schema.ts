import { pgTable, pgEnum, uuid, varchar, timestamp, foreignKey, unique, text, integer, bigint, boolean, serial, doublePrecision, uniqueIndex, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const enum_Contracts_operationType = pgEnum("enum_Contracts_operationType", ['sale', 'rent', 'tempRent', 'salePost', 'rentPost'])
export const enum_Contracts_status = pgEnum("enum_Contracts_status", ['template', 'pending', 'signed', 'canceled', 'finished'])
export const enum_Contracts_type = pgEnum("enum_Contracts_type", ['fisico', 'signature'])
export const enum_Cupons_status = pgEnum("enum_Cupons_status", ['Active', 'Deleted', 'Paused'])
export const enum_DraftAlquilers_status = pgEnum("enum_DraftAlquilers_status", ['Aprobado', 'Pendiente', 'En evaluación', 'Rechazado', 'Listo para firmar'])
export const enum_Payments_paymentMethod = pgEnum("enum_Payments_paymentMethod", ['mercadopago', 'black', 'financiación black'])
export const enum_Payments_status = pgEnum("enum_Payments_status", ['approved', 'cancelled', 'pending'])
export const enum_Payments_type = pgEnum("enum_Payments_type", ['Fees', 'Reservation'])
export const enum_Posts_status = pgEnum("enum_Posts_status", ['Active', 'Paused', 'Deleted', 'Pendiente', 'Denegada'])
export const enum_Posts_type = pgEnum("enum_Posts_type", ['alquiler', 'venta', 'temporal'])
export const enum_Properties_hostingType = pgEnum("enum_Properties_hostingType", ['Alojamiento entero', 'Una habitación', 'Habitación compartida'])
export const enum_Properties_propertyStatus = pgEnum("enum_Properties_propertyStatus", ['En construcción', 'A estrenar', 'Bueno', 'Muy bueno', 'Excelente', 'Reciclado', 'A restaurar', 'Otro'])
export const enum_Tasks_category = pgEnum("enum_Tasks_category", ['Motivo de consulta'])
export const enum_Tasks_description = pgEnum("enum_Tasks_description", ['Solicitud de Publicación para Venta', 'Solicitud de Publicación para Alquiler', 'Solicitud de Publicación para Temporal', 'Solicitud de Alquiler', 'Solicitud de Venta', 'Baja de Usuario', 'Alta de Usuario', 'Enviar dinero al Propietario por mes de alquiler', 'Enviar dinero al Anfitrión reserva alquiler temporal aceptada', 'Enviar dinero de reserva de venta al propietario', 'Devolución de dinero al Inquilino', 'Devolución de dinero al Huésped reserva temporal denegada', 'Devolución de dinero al Comprador reserva de venta denegada', 'Responder Consulta de Publicación', 'Responder Ticket', 'Solicitud de Actualizacion de Cuota de Alquiler', 'Solicitud de Baja de Contrato', 'Entrega de Llaves de Inmueble', 'Reporte de Publicación-Usuario', 'Notificación de Compra de Garantia', 'Solicitud de adhesión de Representante', 'Pago a propietarios de morosos con garantia trustfund', 'Solicitud de reserva de alquiler temporal', 'Solicitud de reporte Publicación', 'Solicitud de financiación de honorarios de alquiler', 'Otro'])
export const enum_Tasks_status = pgEnum("enum_Tasks_status", ['Pendiente', 'A revisar', 'Revisada', 'Finalizada'])
export const enum_Tickets_category = pgEnum("enum_Tickets_category", ['Consulta', 'Procesos', 'Reclamos'])
export const enum_Tickets_description = pgEnum("enum_Tickets_description", ['Consultas', 'Consulta de Publicación', 'Entrega de llaves de inmueble', 'Reclamos', 'Actualización de cuota de alquiler', 'Baja de contrato', 'Coordinar Hospedaje', 'Coordinar venta entre interesados', 'Otro'])
export const enum_Tickets_state = pgEnum("enum_Tickets_state", ['Abierto', 'Cerrado'])
export const enum_Users_type = pgEnum("enum_Users_type", ['Admin', 'Agente', 'User', 'Inmobiliaria', 'Locked'])
export const enum_Users_userState = pgEnum("enum_Users_userState", ['Active', 'Delete', 'Inactive'])


export const Provincia = pgTable("Provincia", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const SubProvincia = pgTable("SubProvincia", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	ProvinciumId: uuid("ProvinciumId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const Partidos = pgTable("Partidos", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	SubProvinciumId: uuid("SubProvinciumId").references(() => SubProvincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciumId: uuid("ProvinciumId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciaPartidoId: uuid("ProvinciaPartidoId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const Localidads = pgTable("Localidads", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	PartidoId: uuid("PartidoId").references(() => Partidos.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciumId: uuid("ProvinciumId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciaLocalidadId: uuid("ProvinciaLocalidadId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const Barrios = pgTable("Barrios", {
	id: uuid("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	LocalidadId: uuid("LocalidadId").references(() => Localidads.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciumId: uuid("ProvinciumId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
	ProvinciaBarrioId: uuid("ProvinciaBarrioId").references(() => Provincia.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const ContractTypes = pgTable("ContractTypes", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	contractType: varchar("contractType", { length: 255 }).notNull(),
	data: text("data"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		ContractTypes_contractType_key: unique("ContractTypes_contractType_key").on(table.contractType),
	}
});

export const Users = pgTable("Users", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	lastname: varchar("lastname", { length: 255 }),
	inmobiliaria: varchar("inmobiliaria", { length: 255 }),
	imagen_profile: text("imagen_profile"),
	type: enum_Users_type("type"),
	street: text("street"),
	number: varchar("number", { length: 255 }),
	intersectionOne: varchar("intersectionOne", { length: 255 }),
	intersectionTwo: varchar("intersectionTwo", { length: 255 }),
	piso: varchar("piso", { length: 255 }),
	depto: varchar("depto", { length: 255 }),
	pais: varchar("pais", { length: 255 }),
	provincia: varchar("provincia", { length: 255 }),
	partido_localidad: varchar("partido_localidad", { length: 255 }),
	city: varchar("city", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	dni: integer("dni"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cuilcuit: bigint("cuilcuit", { mode: "number" }),
	cbu: varchar("cbu", { length: 255 }),
	postal_code: varchar("postal_code", { length: 255 }),
	dni_frente: varchar("dni_frente", { length: 255 }).array(),
	dni_dorso: varchar("dni_dorso", { length: 255 }).array(),
	imgBiometrica: varchar("imgBiometrica", { length: 255 }),
	recibo: varchar("recibo", { length: 255 }),
	garantia: varchar("garantia", { length: 255 }),
	verified_data: boolean("verified_data").default(false),
	password: varchar("password", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	isInquilino: boolean("isInquilino"),
	isPropietario: boolean("isPropietario"),
	resetLink: varchar("resetLink", { length: 255 }).default(''),
	userState: enum_Users_userState("userState"),
	googleId: varchar("googleId", { length: 255 }),
	rol: varchar("rol", { length: 255 }),
	location: varchar("location", { length: 255 }),
	create: boolean("create").default(true).notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		Users_email_key: unique("Users_email_key").on(table.email),
	}
});

export const Contracts = pgTable("Contracts", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	contractTypeId: varchar("contractTypeId", { length: 255 }).notNull().references(() => ContractTypes.id, { onUpdate: "cascade" } ),
	type: enum_Contracts_type("type").notNull(),
	operationType: enum_Contracts_operationType("operationType").notNull(),
	operationId: varchar("operationId", { length: 255 }),
	postId: varchar("postId", { length: 255 }),
	contractId: varchar("contractId", { length: 255 }),
	url: varchar("url", { length: 255 }),
	status: enum_Contracts_status("status").notNull(),
	propertyOwnerId: varchar("propertyOwnerId", { length: 255 }).notNull().references(() => Users.id, { onUpdate: "cascade" } ),
	tenantId: varchar("tenantId", { length: 255 }).references(() => Users.id, { onUpdate: "cascade" } ),
	signWithFlexy: boolean("signWithFlexy").default(false),
	initDate: varchar("initDate", { length: 255 }),
	endDate: varchar("endDate", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
});

export const Favorites = pgTable("Favorites", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	idPublicacion: varchar("idPublicacion", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	UserId: varchar("UserId", { length: 255 }).references(() => Users.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const KitepropSeguimientos = pgTable("KitepropSeguimientos", {
	id: uuid("id").primaryKey().notNull(),
	kitepropId: integer("kitepropId"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const MercadopagoNotifications = pgTable("MercadopagoNotifications", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	topic: varchar("topic", { length: 255 }).notNull(),
	dataId: varchar("dataId", { length: 255 }).notNull(),
	authorization: varchar("authorization", { length: 255 }),
	externalReference: varchar("externalReference", { length: 255 }),
	additionalInfo: varchar("additionalInfo", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const Tickets = pgTable("Tickets", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	ticketNum: serial("ticketNum").notNull(),
	description: enum_Tickets_description("description").notNull(),
	assignedOffice: varchar("assignedOffice", { length: 255 }).references(() => Users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	state: enum_Tickets_state("state").default('Abierto'),
	objectId: varchar("objectId", { length: 255 }),
	initiator: varchar("initiator", { length: 255 }).notNull().references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	counterpart: varchar("counterpart", { length: 255 }).references(() => Users.id, { onDelete: "set null", onUpdate: "cascade" } ),
	watched: boolean("watched").default(false),
	contract: varchar("contract", { length: 255 }),
	category: enum_Tickets_category("category"),
	priority: varchar("priority", { length: 255 }),
	document: varchar("document", { length: 255 }).array(),
	reasonForResolution: varchar("reasonForResolution", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
});

export const Messages = pgTable("Messages", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	ticketId: varchar("ticketId", { length: 255 }).notNull().references(() => Tickets.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	content: text("content").notNull(),
	sender: varchar("sender", { length: 255 }).references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	watched: boolean("watched").default(false),
	reminders: boolean("reminders").default(false),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
});

export const Cupons = pgTable("Cupons", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	expiration: timestamp("expiration", { withTimezone: true, mode: 'string' }).notNull(),
	amount: integer("amount"),
	percent: varchar("percent", { length: 255 }),
	totalApplications: integer("totalApplications"),
	status: enum_Cupons_status("status").default('Active'),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
});

export const Packs = pgTable("Packs", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	price: doublePrecision("price").notNull(),
	quantity: integer("quantity").notNull(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const Payments = pgTable("Payments", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	preferenceId: varchar("preferenceId", { length: 255 }).notNull(),
	collectionId: varchar("collectionId", { length: 255 }).notNull(),
	paymentId: varchar("paymentId", { length: 255 }).notNull().references(() => Packs.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	paymentLink: varchar("paymentLink", { length: 255 }),
	price: doublePrecision("price").notNull(),
	priceWithDiscount: doublePrecision("priceWithDiscount"),
	status: enum_Payments_status("status").notNull(),
	type: enum_Payments_type("type"),
	paymentMethod: enum_Payments_paymentMethod("paymentMethod").notNull(),
	pendingStatusNotified: boolean("pendingStatusNotified").default(false),
	expirationDate: varchar("expirationDate", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	packId: varchar("packId", { length: 255 }).references(() => Packs.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const Properties = pgTable("Properties", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	owner: varchar("owner", { length: 255 }).notNull().references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	title: text("title").notNull(),
	description: text("description").notNull(),
	typeProp: varchar("typeProp", { length: 255 }).notNull().references(() => PropertyTypes.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	street: text("street").notNull(),
	intersectionOne: varchar("intersectionOne", { length: 255 }).notNull(),
	intersectionTwo: varchar("intersectionTwo", { length: 255 }),
	pais: varchar("pais", { length: 255 }).notNull(),
	province: varchar("province", { length: 255 }).notNull(),
	state: varchar("state", { length: 255 }).notNull(),
	city: varchar("city", { length: 255 }).notNull(),
	barrio: varchar("barrio", { length: 255 }),
	postalCode: varchar("postalCode", { length: 255 }),
	number: text("number").notNull(),
	piso: varchar("piso", { length: 255 }),
	depto: varchar("depto", { length: 255 }),
	lat: varchar("lat", { length: 255 }).notNull(),
	long: varchar("long", { length: 255 }).notNull(),
	video: varchar("video", { length: 255 }).array(),
	plane: varchar("plane", { length: 255 }).array(),
	deed: varchar("deed", { length: 255 }).array(),
	mainImage: varchar("mainImage", { length: 255 }),
	multimedia: varchar("multimedia", { length: 255  }).array(),
	propertyStatus: enum_Properties_propertyStatus("propertyStatus"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	ambient: bigint("ambient", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bedroom: bigint("bedroom", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	bathroom: bigint("bathroom", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	beds: bigint("beds", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	travellersCapacity: bigint("travellersCapacity", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	surface: bigint("surface", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	mCovered: bigint("mCovered", { mode: "number" }),
	antiquity: varchar("antiquity", { length: 255 }),
	generalAttributes: varchar("generalAttributes", { length: 255 }).array(),
	typesAmbients: varchar("typesAmbients", { length: 255 }).array(),
	services: varchar("services", { length: 255 }).array(),
	facilities: varchar("facilities", { length: 255 }).array(),
	securityItems: varchar("securityItems", { length: 255 }).array(),
	quickDescription: varchar("quickDescription", { length: 255 }).array(),
	disponibilidad: varchar("disponibilidad", { length: 255 }),
	hostingType: enum_Properties_hostingType("hostingType"),
	documents: varchar("documents", { length: 255 }).array(),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
});

export const PropertyTypes = pgTable("PropertyTypes", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).default('housing'),
	applications: varchar("applications", { length: 255 }).array(),
});

export const Posts = pgTable("Posts", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	owner: varchar("owner", { length: 255 }).notNull().references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	property: varchar("property", { length: 255 }).notNull().references(() => Properties.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: enum_Posts_type("type").notNull(),
	publicationType: varchar("publicationType", { length: 255 }),
	currency: varchar("currency", { length: 255 }).default('UF'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	price: bigint("price", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	cleaningFee: bigint("cleaningFee", { mode: "number" }),
	expenseTypes: varchar("expenseTypes", { length: 255 }),
	expenseCurrency: varchar("expenseCurrency", { length: 255 }).default('UF'),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	expensePrice: bigint("expensePrice", { mode: "number" }),
	finance: boolean("finance"),
	disponibilidad: text("disponibilidad").array(),
	specificPrices: text("specificPrices").array(),
	periodo: varchar("periodo", { length: 255 }),
	garantia: varchar("garantia", { length: 255 }).array(),
	authorization: varchar("authorization", { length: 255 }).array(),
	minimum_days: boolean("minimum_days"),
	amount_minimum_days: integer("amount_minimum_days"),
	status: enum_Posts_status("status"),
	periodoAumento: varchar("periodoAumento", { length: 255 }),
	cbu: varchar("cbu", { length: 255 }),
	visits: integer("visits"),
	kitepropId: integer("kitepropId"),
	kitepropLastUpdate: varchar("kitepropLastUpdate", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
	ContractId: varchar("ContractId", { length: 255 }).references(() => Contracts.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const UserCupons = pgTable("UserCupons", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => Users.id),
	cuponId: varchar("cuponId", { length: 255 }).notNull().references(() => Cupons.id),
	usedAt: timestamp("usedAt", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	deletedAt: timestamp("deletedAt", { withTimezone: true, mode: 'string' }),
	UserId: varchar("UserId", { length: 255 }).references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	CuponId: varchar("CuponId", { length: 255 }).references(() => Cupons.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		user_cupons_user_id_cupon_id: uniqueIndex("user_cupons_user_id_cupon_id").using("btree", table.userId, table.cuponId),
		UserCupons_UserId_CuponId_key: unique("UserCupons_UserId_CuponId_key").on(table.UserId, table.CuponId),
	}
});

export const VariableEditorTexts = pgTable("VariableEditorTexts", {
	id: uuid("id").primaryKey().notNull(),
	name: text("name"),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
});

export const Tasks = pgTable("Tasks", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	taskNum: serial("taskNum").notNull(),
	description: enum_Tasks_description("description").notNull(),
	assignedOffice: varchar("assignedOffice", { length: 255 }),
	status: enum_Tasks_status("status"),
	objectId: varchar("objectId", { length: 255 }),
	initiator: varchar("initiator", { length: 255 }),
	contraparte: varchar("contraparte", { length: 255 }),
	contract: varchar("contract", { length: 255 }),
	category: enum_Tasks_category("category"),
	asunto: varchar("asunto", { length: 255 }),
	priority: varchar("priority", { length: 255 }),
	document: varchar("document", { length: 255 }).array(),
	reasonForResolution: varchar("reasonForResolution", { length: 255 }),
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		Tasks_taskNum_key: unique("Tasks_taskNum_key").on(table.taskNum),
	}
});

export const user_tasks = pgTable("user_tasks", {
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	TaskId: varchar("TaskId", { length: 255 }).notNull().references(() => Tasks.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	UserId: varchar("UserId", { length: 255 }).notNull().references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		user_tasks_pkey: primaryKey({ columns: [table.TaskId, table.UserId], name: "user_tasks_pkey"}),
	}
});

export const user_packs = pgTable("user_packs", {
	createdAt: timestamp("createdAt", { withTimezone: true, mode: 'string' }).notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).notNull(),
	UserId: varchar("UserId", { length: 255 }).notNull().references(() => Users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	PackId: varchar("PackId", { length: 255 }).notNull().references(() => Packs.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		user_packs_pkey: primaryKey({ columns: [table.UserId, table.PackId], name: "user_packs_pkey"}),
	}
});