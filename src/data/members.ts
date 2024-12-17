import { Member } from '../types/Member'
import { saveToHistory } from './history'

const members: Member[] = [
  {
    id: 1001,
    name: "أحمد محمد",
    membershipType: "عضوية ذهبية",
    phone: "0501234567",
    joinDate: "2023/01/15",
    endDate: "2024/06/15",
    status: "نشط",
    image: "https://i.pravatar.cc/150?img=1",
    isPresent: false,
    attendanceCount: 0,
    visitHours: []
  },
  // ... rest of the initial members array
]

export const getMembersList = (): Member[] => {
  const storedMembers = localStorage.getItem('members')
  if (storedMembers) {
    return JSON.parse(storedMembers)
  }
  localStorage.setItem('members', JSON.stringify(members))
  return members
}

const generateRandomId = (existingMembers: Member[]): number => {
  const existingIds = new Set(existingMembers.map(m => m.id))
  let newId: number
  
  do {
    newId = Math.floor(Math.random() * 9000) + 1000
  } while (existingIds.has(newId))
  
  return newId
}

export const toggleMemberAttendance = (memberId: number) => {
  const currentMembers = getMembersList()
  saveToHistory('members', currentMembers)

  const currentHour = new Date().getHours()
  
  const updatedMembers = currentMembers.map(member => {
    if (member.id === memberId) {
      if (!member.isPresent) {
        return { 
          ...member, 
          isPresent: true,
          attendanceCount: (member.attendanceCount || 0) + 1,
          visitHours: [...(member.visitHours || []), currentHour]
        }
      }
      return { ...member, isPresent: false }
    }
    return member
  })
  localStorage.setItem('members', JSON.stringify(updatedMembers))
  return updatedMembers
}

export const addNewMember = (newMember: Omit<Member, 'id' | 'isPresent' | 'status' | 'attendanceCount' | 'visitHours'>) => {
  // التحقق من وجود الصورة
  if (!newMember.image) {
    throw new Error('يجب إضافة صورة للعضو')
  }

  const currentMembers = getMembersList()
  saveToHistory('members', currentMembers)

  const newId = generateRandomId(currentMembers)
  
  const memberToAdd: Member = {
    ...newMember,
    id: newId,
    isPresent: false,
    status: "نشط",
    attendanceCount: 0,
    visitHours: []
  }
  
  const updatedMembers = [...currentMembers, memberToAdd]
  localStorage.setItem('members', JSON.stringify(updatedMembers))
  return updatedMembers
}

export const updateMember = (updatedMember: Member) => {
  const currentMembers = getMembersList()
  saveToHistory('members', currentMembers)

  const updatedMembers = currentMembers.map(member => {
    if (member.id === updatedMember.id) {
      if (member.endDate !== updatedMember.endDate) {
        return { ...updatedMember, attendanceCount: 0, visitHours: [] }
      }
      return updatedMember
    }
    return member
  })
  localStorage.setItem('members', JSON.stringify(updatedMembers))
  return updatedMembers
}

export const deleteMember = (memberId: number) => {
  const currentMembers = getMembersList()
  saveToHistory('members', currentMembers)

  const updatedMembers = currentMembers.filter(member => member.id !== memberId)
  localStorage.setItem('members', JSON.stringify(updatedMembers))
  return updatedMembers
}
