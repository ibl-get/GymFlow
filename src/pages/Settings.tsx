import React, { useState, useRef, useEffect } from 'react'
import { Upload, Save, Palette, Image as ImageIcon, X, Key } from 'lucide-react'
import { getGymSettings, updateGymSettings } from '../data/settings'
import type { GymSettings } from '../types/GymSettings'
import ImageCropper from '../components/ImageCropper'

function Settings() {
  const [settings, setSettings] = useState<GymSettings>(getGymSettings())
  const [previewLogo, setPreviewLogo] = useState<string>(settings.logo)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bgImageInputRef = useRef<HTMLInputElement>(null)
  const [saveStatus, setSaveStatus] = useState<string>('')
  const [showCropper, setShowCropper] = useState(false)
  const [originalImage, setOriginalImage] = useState<string>('')
  const [cropType, setCropType] = useState<'logo' | 'background'>('logo')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')

  useEffect(() => {
    const storedSettings = getGymSettings()
    setSettings(storedSettings)
    setPreviewLogo(storedSettings.logo)
  }, [])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // التحقق من صيغة الملف
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert('يرجى اختيار ملف صورة بصيغة PNG أو JPEG')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setOriginalImage(imageUrl)
        setCropType('logo')
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setSettings(prev => ({ ...prev, logo: '' }))
    setPreviewLogo('')
  }

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setSettings(prev => ({ ...prev, backgroundImage: imageUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = (croppedImage: string) => {
    if (cropType === 'logo') {
      const updatedSettings = { ...settings, logo: croppedImage }
      setSettings(updatedSettings)
      setPreviewLogo(croppedImage)
      
      // حفظ الشعار في الإعدادات والتخزين المحلي
      updateGymSettings(updatedSettings)
      localStorage.setItem('gymLogo', croppedImage)
    }
    setShowCropper(false)
  }

  const removeBackgroundImage = () => {
    setSettings(prev => ({ ...prev, backgroundImage: '' }))
  }

  const handleTimeChange = (field: 'openingTime' | 'closingTime', value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordStatus('')

    // التحقق من إدخال كلمة المرور الجديدة
    if (!newPassword) {
      setPasswordError('الرجاء إدخال كلمة المرور الجديدة')
      return
    }

    // التحقق من قوة كلمة المرور
    if (newPassword.length < 6) {
      setPasswordError('يجب أن تكون كلمة المرور 6 أحرف على الأقل')
      return
    }

    try {
      // تحديث كلمة المرور
      const currentSettings = getGymSettings()
      const updatedSettings = {
        ...currentSettings,
        password: newPassword
      }
      
      updateGymSettings(updatedSettings)
      
      // مسح الحقول
      setNewPassword('')
      
      // عرض رسالة نجاح
      setPasswordStatus('تم تغيير كلمة المرور بنجاح')
      setTimeout(() => setPasswordStatus(''), 3000)
    } catch (error) {
      setPasswordError('حدث خطأ أثناء تغيير كلمة المرور')
      console.error(error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // تحديث الإعدادات مع الشعار
    updateGymSettings(settings)
    
    // تحديث الشعار في التخزين المحلي أيضًا
    localStorage.setItem('gymLogo', settings.logo || '')
    
    setSaveStatus('تم حفظ التغييرات بنجاح')
    setTimeout(() => setSaveStatus(''), 3000)
  }

  return (
    <div className="container mx-auto max-w-2xl relative min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">إعدادات النادي</h1>
        <p className="text-gray-300">تحكم في المعلومات الأساسية للنادي</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings Card */}
        <div className="glass p-8 rounded-xl mb-6">
          {/* Logo Upload Section */}
          <div className="flex flex-col items-center mb-8">
            <div 
              className="w-40 h-40 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center mb-4 overflow-hidden cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundImage: previewLogo ? `url(${previewLogo})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!previewLogo && (
                <div className="text-white/70 hover:text-white flex flex-col items-center">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="text-sm">اختر شعار النادي</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            {previewLogo && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-white/70 hover:text-white"
                >
                  تغيير الشعار
                </button>
                <button
                  type="button"
                  onClick={removeLogo}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  إزالة الشعار
                </button>
              </div>
            )}
          </div>

          {/* Gym Name */}
          <div>
            <label className="block text-white mb-2">اسم النادي</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
              placeholder="أدخل اسم النادي"
              required
            />
          </div>

          {/* Opening Hours */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-white mb-2">وقت الافتتاح</label>
              <input
                type="time"
                value={settings.openingTime}
                onChange={(e) => handleTimeChange('openingTime', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">وقت الإغلاق</label>
              <input
                type="time"
                value={settings.closingTime}
                onChange={(e) => handleTimeChange('closingTime', e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="glass p-8 rounded-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">تغيير كلمة المرور</h2>
          
          {passwordError && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-center">
              {passwordError}
            </div>
          )}
          
          {passwordStatus && (
            <div className="bg-green-500/20 border border-green-500 text-green-500 p-3 rounded-lg mb-4 text-center">
              {passwordStatus}
            </div>
          )}
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-white mb-2">كلمة المرور الجديدة</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                placeholder="أدخل كلمة المرور الجديدة"
              />
            </div>
            
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              تغيير كلمة المرور
            </button>
          </form>
        </div>

        {/* Background Settings Card */}
        <div className="glass p-8 rounded-xl mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">خلفية التطبيق</h2>
          </div>

          {/* Background Options */}
          <div className="space-y-6">
            {/* Background Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSettings(prev => ({ ...prev, backgroundImage: '' }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  !settings.backgroundImage 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <Palette className="w-6 h-6 mx-auto mb-2 text-white" />
                <span className="block text-white text-sm">تدرج لوني</span>
              </button>

              <button
                type="button"
                onClick={() => bgImageInputRef.current?.click()}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.backgroundImage 
                    ? 'border-blue-500 bg-blue-500/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <ImageIcon className="w-6 h-6 mx-auto mb-2 text-white" />
                <span className="block text-white text-sm">صورة خلفية</span>
              </button>
            </div>

            {/* Background Image Section */}
            {settings.backgroundImage ? (
              <div className="space-y-4">
                <div className="relative group rounded-lg overflow-hidden">
                  <img 
                    src={settings.backgroundImage} 
                    alt="خلفية التطبيق"
                    className="w-full object-cover rounded-lg"
                    style={{ maxHeight: '300px' }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => bgImageInputRef.current?.click()}
                      className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                      title="تغيير الصورة"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={removeBackgroundImage}
                      className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-300"
                      title="إزالة الصورة"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400 text-center">
                  انقر على الصورة لتغييرها أو إزالتها
                </p>
              </div>
            ) : (
              /* Gradient Color Section */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">اللون الأول</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.gradientFrom}
                        onChange={(e) => setSettings(prev => ({ ...prev, gradientFrom: e.target.value }))}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.gradientFrom}
                        onChange={(e) => setSettings(prev => ({ ...prev, gradientFrom: e.target.value }))}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2">اللون الثاني</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.gradientTo}
                        onChange={(e) => setSettings(prev => ({ ...prev, gradientTo: e.target.value }))}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.gradientTo}
                        onChange={(e) => setSettings(prev => ({ ...prev, gradientTo: e.target.value }))}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>

                <div 
                  className="w-full h-48 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, ${settings.gradientFrom}, ${settings.gradientTo})`
                  }}
                />
              </div>
            )}

            <input
              ref={bgImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleBackgroundImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التغييرات</span>
          </button>
        </div>

        {/* Save Status Message */}
        {saveStatus && (
          <div className="text-center text-green-400 mt-4">
            {saveStatus}
          </div>
        )}
      </form>

      {/* Image Cropper Modal - Only for Logo */}
      {showCropper && cropType === 'logo' && (
        <ImageCropper
          imageSrc={originalImage}
          onCropComplete={handleCropComplete}
          onCancel={() => setShowCropper(false)}
          circularCrop={true}
          aspectRatio={1}
        />
      )}
    </div>
  )
}

export default Settings
