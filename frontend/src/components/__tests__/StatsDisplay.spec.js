import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsDisplay from '../StatsDisplay.vue'

describe('StatsDisplay.vue', () => {
  it('renders the main heading', () => {
    const wrapper = mount(StatsDisplay)
    expect(wrapper.find('h2').text()).toBe('Statistics Visualization')
  })
})
