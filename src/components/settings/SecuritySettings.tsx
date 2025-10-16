'use client';

import React, { useState } from 'react';
import { EyeOffIcon, EyeOnIcon } from '@/lib/icons';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change requested');
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-secondary-black mb-8">Security</h1>

        <div className="space-y-8">
          {/* Two-Factor Authentication */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={handleTwoFactorToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {twoFactorEnabled 
                ? 'Two-factor authentication is currently enabled' 
                : 'Two-factor authentication is currently disabled'
              }
            </p>
          </div>

          {/* Password Change */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Input
                  label="Current Password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showCurrentPassword ? (
                        <EyeOnIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>
              <div>
                <Input
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showNewPassword ? (
                        <EyeOnIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>
              <div>
                <Input
                  label="Confirm New Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOnIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button variant="primary" type="submit">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}
