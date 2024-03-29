import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'
import { Heading } from '@/components/ui/heading/heading.component'
import {LOADER_SELECTOR, Loader} from '@/components/ui/loader/loader.component'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { StatisticService } from '@/api/statistic.service'
import styles from './statistics.module.scss'
import template from './statistics.template.html'
import { StatisticsItem } from './statistics-item/statistics-item.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $MV } from '@/core/mvquery/mvquery.lib'

export class Statistics extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Statistics')],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted.bind(this)
		)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionCompleted.bind(this)
		)
	}

	#onTransactionCompleted() {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.statisticService.main(data => {
			if (!data) return

			const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			if (loaderElement) loaderElement.remove()

			const statisticsItemsElement = $MV(this.element).find('#statistics-items')
			statisticsItemsElement.text('')

			statisticsItemsElement
				.append(
					new StatisticsItem(
						'Income:',
						formatToCurrency(data[0].value),
						'green'
					).render()
				)
				.append(
					new StatisticsItem(
						'Expense:',
						formatToCurrency(data[1].value),
						'purple'
					).render()
				)
		})
	}

	render() {
		if (this.store.user) {
			$MV(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}

		return this.element
	}
}