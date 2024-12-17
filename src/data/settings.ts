import { GymSettings } from '../types/GymSettings'
import { saveToHistory } from './history'

const defaultSettings: GymSettings = {
  name: 'نادي جليدة الرياضي',
  logo: '',
  openingTime: '06:00',
  closingTime: '23:00',
  gradientFrom: '#1e3a8a',
  gradientTo: '#581c87',
  backgroundImage: ''
}

export const getGymSettings = (): GymSettings => {
  try {
    const stored = localStorage.getItem('gymSettings')
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        ...defaultSettings,
        ...parsed,
      }
    }
  } catch (error) {
    console.error('Error reading settings:', error)
  }
  localStorage.setItem('gymSettings', JSON.stringify(defaultSettings))
  return defaultSettings
}

export const updateGymSettings = (settings: GymSettings): void => {
  try {
    const currentSettings = getGymSettings()
    saveToHistory('settings', currentSettings)

    const formatTime = (time: string) => {
      if (!time.includes(':')) {
        time = time + ':00'
      }
      return time.padStart(5, '0')
    }

    const updatedSettings = {
      ...settings,
      openingTime: formatTime(settings.openingTime),
      closingTime: formatTime(settings.closingTime)
    }

    localStorage.setItem('gymSettings', JSON.stringify(updatedSettings))
    window.dispatchEvent(new Event('settingsUpdated'))
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}
