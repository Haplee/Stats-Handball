import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LandingSection from '../LandingSection.vue'

describe('LandingSection.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(LandingSection)
    expect(wrapper.find('h1').text()).toBe('Stats-Handball')
  })
})
