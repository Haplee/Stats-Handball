import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'

describe('Footer.vue', () => {
  it('renders the copyright text', () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('p:last-child').text()).toContain('© 2024 Stats-Handball')
  })
})
