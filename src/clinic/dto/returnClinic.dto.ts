export class ReturnClinicDto {
	id: number;
	phone: string;
	name: string;
	address: string;
	email: string;
	collab: boolean;
}

export const map2clinic = (user) => {
	const { id, phone, name, address, email, collab, ...rest } = user;
	return { id, phone, name, address, email, collab };
};
