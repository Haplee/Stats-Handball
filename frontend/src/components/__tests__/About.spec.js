import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../About.vue'

describe('About.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(About)
    expect(wrapper.find('h2').text()).toBe('What does the application do?')
  })
})
