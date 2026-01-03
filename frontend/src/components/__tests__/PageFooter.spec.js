import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageFooter from '../PageFooter.vue'

describe('PageFooter.vue', () => {
  it('renders the copyright text', () => {
    const wrapper = mount(PageFooter)
    expect(wrapper.find('p:last-child').text()).toContain('© 2024 Stats-Handball')
  })
})
