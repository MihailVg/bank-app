import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { formatDate } from '@/utils/format/format-to-date'
import styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'
import { $MV } from '@/core/mvquery/mvquery.lib'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$MV(this.element).addClass(styles.income)
		}

		$MV(this.element).find('#transaction-name').text(name)

		$MV(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))

		$MV(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}