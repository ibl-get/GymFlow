import { Member } from '../types/Member'
import { GymSettings } from '../types/GymSettings'

interface HistoryEntry {
  timestamp: number
  type: 'members' | 'settings'
  previousState: Member[] | GymSettings
}

const MAX_HISTORY = 10 // Maximum number of history entries to keep

export const saveToHistory = (type: 'members' | 'settings', previousState: Member[] | GymSettings) => {
  try {
    const history = getHistory()
    const newEntry: HistoryEntry = {
      timestamp: Date.now(),
      type,
      previousState
    }
    
    history.unshift(newEntry)
    
    // Keep only the last MAX_HISTORY entries
    if (history.length > MAX_HISTORY) {
      history.pop()
    }
    
    localStorage.setItem('actionHistory', JSON.stringify(history))
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

export const getHistory = (): HistoryEntry[] => {
  try {
    const history = localStorage.getItem('actionHistory')
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error getting history:', error)
    return []
  }
}

export const clearHistory = () => {
  localStorage.removeItem('actionHistory')
}

export const undo = () => {
  const history = getHistory()
  if (history.length === 0) return null

  const lastAction = history[0]
  history.shift() // Remove the last action
  localStorage.setItem('actionHistory', JSON.stringify(history))

  if (lastAction.type === 'members') {
    localStorage.setItem('members', JSON.stringify(lastAction.previousState))
  } else if (lastAction.type === 'settings') {
    localStorage.setItem('gymSettings', JSON.stringify(lastAction.previousState))
  }

  // Notify components of the change
  window.dispatchEvent(new Event('historyChange'))
  
  return lastAction.type
}
