import ChildComponent from "@/core/component/child.component";
import renderService from "@/core/services/render.service";

import template from './heading.template.html'
import styles from './heading.module.scss'
import { $MV } from "@/core/mvquery/mvquery.lib";

export class Heading extends ChildComponent {
  constructor(title = '') {
    super()

    this.title = title
  }
  render(){
    this.element = renderService.htmlToElement(template, [], styles);

    $MV(this.element).text(this.title)

    return this.element
  }
}