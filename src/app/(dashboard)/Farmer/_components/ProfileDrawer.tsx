"use client"

import { useState } from "react";
import { X, User, Mail, Phone, MapPin, Calendar, Camera, Edit, Save, Settings, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: "Elia Farmer",
    email: "elia@food.rw",
    phone: "+250 788 123 456",
    location: "Kigali, Rwanda",
    bio: "Passionate farmer dedicated to sustainable agriculture and quality food production. I specialize in organic farming techniques and have been growing crops for over 8 years.",
    joinDate: "January 2023",
    farmSize: "5 hectares",
    crops: "Tomatoes, Carrots, Lettuce, Beans",
    completedOrders: 156,
    rating: 4.8,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate API call
    console.log("Profile updated:", profileData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">My Profile</h2>
                <p className="text-green-100 text-sm">Manage your account</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-white/20 text-white border-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                activeTab === 'profile' 
                  ? 'bg-white text-green-700 shadow-sm' 
                  : 'text-green-100 hover:bg-white/10'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                activeTab === 'settings' 
                  ? 'bg-white text-green-700 shadow-sm' 
                  : 'text-green-100 hover:bg-white/10'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-full pb-20">
          {activeTab === 'profile' && (
            <div className="p-6">
              {/* Profile Picture and Stats */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl ring-4 ring-green-100">
                    <span className="text-white text-3xl font-bold">E</span>
                  </div>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
                    >
                      <Camera className="h-4 w-4 text-white" />
                    </Button>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{profileData.name}</h3>
                <p className="text-green-600 font-medium">Verified Farmer</p>
                
                {/* Stats */}
                <div className="flex justify-center gap-6 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{profileData.completedOrders}</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{profileData.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{profileData.farmSize}</p>
                    <p className="text-xs text-gray-500">Farm Size</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-medium"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1 py-3 border-gray-300"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    Personal Information
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.name}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            {profileData.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {profileData.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Location</Label>
                        {isEditing ? (
                          <Input
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {profileData.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farm Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Settings className="h-4 w-4 text-green-600" />
                    Farm Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Farm Size</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.farmSize}
                          onChange={(e) => handleInputChange('farmSize', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.farmSize}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Main Crops</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.crops}
                          onChange={(e) => handleInputChange('crops', e.target.value)}
                          className="mt-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
                          placeholder="e.g., Tomatoes, Carrots, Lettuce"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{profileData.crops}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4">About Me</h4>
                  {isEditing ? (
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Tell us about yourself and your farming experience..."
                    />
                  ) : (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md leading-relaxed">{profileData.bio}</p>
                  )}
                </div>

                {/* Account Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium">Member since {profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Bell className="h-4 w-4 text-green-600" />
                    Notifications
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive order updates via email</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                        <p className="text-xs text-gray-500">Receive order updates via SMS</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.sms}
                        onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive real-time updates</p>
                      </div>
                      <Switch
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}