import { v4 as uuidV4 } from 'uuid';

export class UUIDAdapter {
	static v4 = () => uuidV4();
}
