import ChildComponent from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './button.template.html'
import styles from './button.module.scss'
import { $MV } from "@/core/mvquery/mvquery.lib";

export class Button extends ChildComponent {
  constructor({children, onClick, variant}) {
    super()

    if (!children) {
      throw new Error('Children is empty!')
    }

    this.children = children
    this.onClick = onClick
    this.variant = variant
  }

  render(){
    this.element = renderService.htmlToElement(template, [], styles);

    $MV(this.element).html(this.children).click(this.onClick)

    if (this.variant) {
      $MV(this.element).addClass(styles[this.variant])
    }

    return this.element
  }
}