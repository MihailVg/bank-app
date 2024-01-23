import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'
import { vinQuery } from '@/core/vin-query/vin-query.lib'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		this.store = Store.getInstance().state
		this.notificationService = new NotificationService()
	}

	byUser(onSuccess) {
		return vinQuery({
			path: `${this.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	updateBalance(amount, type, onSuccess) {
		return vinQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Balance successfully changed!'
				)
				onSuccess()
			}
		})
	}

	transfer({ amount, toCardNumber }, onSuccess) {
		return vinQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.user.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Transfer successfully completed!'
				)
				onSuccess()
			}
		})
	}
}
