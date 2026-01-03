import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TechStack from '../TechStack.vue'

describe('TechStack.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(TechStack)
    expect(wrapper.find('h2').text()).toBe('Technologies Used')
  })
})
