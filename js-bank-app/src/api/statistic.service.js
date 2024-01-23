import { vinQuery } from '@/core/vin-query/vin-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return vinQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}