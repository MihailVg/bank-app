import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import { debounce } from '@/utils/debounce.util'

import { UserService } from '@/api/user.service'

import styles from './search.module.scss'
import template from './search.template.html'
import { $MV } from '@/core/mvquery/mvquery.lib'

export class Search extends ChildComponent {
	constructor() {
		super()
		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value
		const searchResultElement = $MV(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')

			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					searchResultElement.html('')
				}).render()



				$MV(userItem).addClass(styles.item).css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$MV(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(this.#handleSearch, 300)

		$MV(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debouncedHandleSearch)

		return this.element
	}
}