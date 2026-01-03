import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutSection from '../AboutSection.vue'

describe('AboutSection.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(AboutSection)
    expect(wrapper.find('h2').text()).toBe('What does the application do?')
  })
})
