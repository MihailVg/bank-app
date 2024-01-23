import { vinQuery } from "@/core/vin-query/vin-query.lib"


export class UserService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return vinQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}
}