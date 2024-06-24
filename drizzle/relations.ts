import { relations } from "drizzle-orm/relations";
import { Provincia, SubProvincia, Partidos, Localidads, Barrios, ContractTypes, Contracts, Users, Favorites, Tickets, Messages, Packs, Payments, Properties, PropertyTypes, Posts, UserCupons, Cupons, Tasks, user_tasks, user_packs } from "./schema";

export const SubProvinciaRelations = relations(SubProvincia, ({one, many}) => ({
	Provincia: one(Provincia, {
		fields: [SubProvincia.ProvinciumId],
		references: [Provincia.id]
	}),
	Partidos: many(Partidos),
}));

export const ProvinciaRelations = relations(Provincia, ({many}) => ({
	SubProvincias: many(SubProvincia),
	Partidos_ProvinciumId: many(Partidos, {
		relationName: "Partidos_ProvinciumId_Provincia_id"
	}),
	Partidos_ProvinciaPartidoId: many(Partidos, {
		relationName: "Partidos_ProvinciaPartidoId_Provincia_id"
	}),
	Localidads_ProvinciumId: many(Localidads, {
		relationName: "Localidads_ProvinciumId_Provincia_id"
	}),
	Localidads_ProvinciaLocalidadId: many(Localidads, {
		relationName: "Localidads_ProvinciaLocalidadId_Provincia_id"
	}),
	Barrios_ProvinciumId: many(Barrios, {
		relationName: "Barrios_ProvinciumId_Provincia_id"
	}),
	Barrios_ProvinciaBarrioId: many(Barrios, {
		relationName: "Barrios_ProvinciaBarrioId_Provincia_id"
	}),
}));

export const PartidosRelations = relations(Partidos, ({one, many}) => ({
	SubProvincia: one(SubProvincia, {
		fields: [Partidos.SubProvinciumId],
		references: [SubProvincia.id]
	}),
	Provincia_ProvinciumId: one(Provincia, {
		fields: [Partidos.ProvinciumId],
		references: [Provincia.id],
		relationName: "Partidos_ProvinciumId_Provincia_id"
	}),
	Provincia_ProvinciaPartidoId: one(Provincia, {
		fields: [Partidos.ProvinciaPartidoId],
		references: [Provincia.id],
		relationName: "Partidos_ProvinciaPartidoId_Provincia_id"
	}),
	Localidads: many(Localidads),
}));

export const LocalidadsRelations = relations(Localidads, ({one, many}) => ({
	Partido: one(Partidos, {
		fields: [Localidads.PartidoId],
		references: [Partidos.id]
	}),
	Provincia_ProvinciumId: one(Provincia, {
		fields: [Localidads.ProvinciumId],
		references: [Provincia.id],
		relationName: "Localidads_ProvinciumId_Provincia_id"
	}),
	Provincia_ProvinciaLocalidadId: one(Provincia, {
		fields: [Localidads.ProvinciaLocalidadId],
		references: [Provincia.id],
		relationName: "Localidads_ProvinciaLocalidadId_Provincia_id"
	}),
	Barrios: many(Barrios),
}));

export const BarriosRelations = relations(Barrios, ({one}) => ({
	Localidad: one(Localidads, {
		fields: [Barrios.LocalidadId],
		references: [Localidads.id]
	}),
	Provincia_ProvinciumId: one(Provincia, {
		fields: [Barrios.ProvinciumId],
		references: [Provincia.id],
		relationName: "Barrios_ProvinciumId_Provincia_id"
	}),
	Provincia_ProvinciaBarrioId: one(Provincia, {
		fields: [Barrios.ProvinciaBarrioId],
		references: [Provincia.id],
		relationName: "Barrios_ProvinciaBarrioId_Provincia_id"
	}),
}));

export const ContractsRelations = relations(Contracts, ({one, many}) => ({
	ContractType: one(ContractTypes, {
		fields: [Contracts.contractTypeId],
		references: [ContractTypes.id]
	}),
	User_propertyOwnerId: one(Users, {
		fields: [Contracts.propertyOwnerId],
		references: [Users.id],
		relationName: "Contracts_propertyOwnerId_Users_id"
	}),
	User_tenantId: one(Users, {
		fields: [Contracts.tenantId],
		references: [Users.id],
		relationName: "Contracts_tenantId_Users_id"
	}),
	Posts: many(Posts),
}));

export const ContractTypesRelations = relations(ContractTypes, ({many}) => ({
	Contracts: many(Contracts),
}));

export const UsersRelations = relations(Users, ({many}) => ({
	Contracts_propertyOwnerId: many(Contracts, {
		relationName: "Contracts_propertyOwnerId_Users_id"
	}),
	Contracts_tenantId: many(Contracts, {
		relationName: "Contracts_tenantId_Users_id"
	}),
	Favorites: many(Favorites),
	Tickets_assignedOffice: many(Tickets, {
		relationName: "Tickets_assignedOffice_Users_id"
	}),
	Tickets_initiator: many(Tickets, {
		relationName: "Tickets_initiator_Users_id"
	}),
	Tickets_counterpart: many(Tickets, {
		relationName: "Tickets_counterpart_Users_id"
	}),
	Messages: many(Messages),
	Properties: many(Properties),
	Posts: many(Posts),
	UserCupons_userId: many(UserCupons, {
		relationName: "UserCupons_userId_Users_id"
	}),
	UserCupons_UserId: many(UserCupons, {
		relationName: "UserCupons_UserId_Users_id"
	}),
	user_tasks: many(user_tasks),
	user_packs: many(user_packs),
}));

export const FavoritesRelations = relations(Favorites, ({one}) => ({
	User: one(Users, {
		fields: [Favorites.UserId],
		references: [Users.id]
	}),
}));

export const TicketsRelations = relations(Tickets, ({one, many}) => ({
	User_assignedOffice: one(Users, {
		fields: [Tickets.assignedOffice],
		references: [Users.id],
		relationName: "Tickets_assignedOffice_Users_id"
	}),
	User_initiator: one(Users, {
		fields: [Tickets.initiator],
		references: [Users.id],
		relationName: "Tickets_initiator_Users_id"
	}),
	User_counterpart: one(Users, {
		fields: [Tickets.counterpart],
		references: [Users.id],
		relationName: "Tickets_counterpart_Users_id"
	}),
	Messages: many(Messages),
}));

export const MessagesRelations = relations(Messages, ({one}) => ({
	Ticket: one(Tickets, {
		fields: [Messages.ticketId],
		references: [Tickets.id]
	}),
	User: one(Users, {
		fields: [Messages.sender],
		references: [Users.id]
	}),
}));

export const PaymentsRelations = relations(Payments, ({one}) => ({
	Pack_paymentId: one(Packs, {
		fields: [Payments.paymentId],
		references: [Packs.id],
		relationName: "Payments_paymentId_Packs_id"
	}),
	Pack_packId: one(Packs, {
		fields: [Payments.packId],
		references: [Packs.id],
		relationName: "Payments_packId_Packs_id"
	}),
}));

export const PacksRelations = relations(Packs, ({many}) => ({
	Payments_paymentId: many(Payments, {
		relationName: "Payments_paymentId_Packs_id"
	}),
	Payments_packId: many(Payments, {
		relationName: "Payments_packId_Packs_id"
	}),
	user_packs: many(user_packs),
}));

export const PropertiesRelations = relations(Properties, ({one, many}) => ({
	User: one(Users, {
		fields: [Properties.owner],
		references: [Users.id]
	}),
	PropertyType: one(PropertyTypes, {
		fields: [Properties.typeProp],
		references: [PropertyTypes.id]
	}),
	Posts: many(Posts),
}));

export const PropertyTypesRelations = relations(PropertyTypes, ({many}) => ({
	Properties: many(Properties),
}));

export const PostsRelations = relations(Posts, ({one}) => ({
	Property: one(Properties, {
		fields: [Posts.property],
		references: [Properties.id]
	}),
	Contract: one(Contracts, {
		fields: [Posts.ContractId],
		references: [Contracts.id]
	}),
	User: one(Users, {
		fields: [Posts.owner],
		references: [Users.id]
	}),
}));

export const UserCuponsRelations = relations(UserCupons, ({one}) => ({
	User_userId: one(Users, {
		fields: [UserCupons.userId],
		references: [Users.id],
		relationName: "UserCupons_userId_Users_id"
	}),
	Cupon_cuponId: one(Cupons, {
		fields: [UserCupons.cuponId],
		references: [Cupons.id],
		relationName: "UserCupons_cuponId_Cupons_id"
	}),
	User_UserId: one(Users, {
		fields: [UserCupons.UserId],
		references: [Users.id],
		relationName: "UserCupons_UserId_Users_id"
	}),
	Cupon_CuponId: one(Cupons, {
		fields: [UserCupons.CuponId],
		references: [Cupons.id],
		relationName: "UserCupons_CuponId_Cupons_id"
	}),
}));

export const CuponsRelations = relations(Cupons, ({many}) => ({
	UserCupons_cuponId: many(UserCupons, {
		relationName: "UserCupons_cuponId_Cupons_id"
	}),
	UserCupons_CuponId: many(UserCupons, {
		relationName: "UserCupons_CuponId_Cupons_id"
	}),
}));

export const user_tasksRelations = relations(user_tasks, ({one}) => ({
	Task: one(Tasks, {
		fields: [user_tasks.TaskId],
		references: [Tasks.id]
	}),
	User: one(Users, {
		fields: [user_tasks.UserId],
		references: [Users.id]
	}),
}));

export const TasksRelations = relations(Tasks, ({many}) => ({
	user_tasks: many(user_tasks),
}));

export const user_packsRelations = relations(user_packs, ({one}) => ({
	User: one(Users, {
		fields: [user_packs.UserId],
		references: [Users.id]
	}),
	Pack: one(Packs, {
		fields: [user_packs.PackId],
		references: [Packs.id]
	}),
}));