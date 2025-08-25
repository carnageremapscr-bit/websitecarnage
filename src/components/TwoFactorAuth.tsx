"use client";
import React, { useState, useEffect } from "react";
import { FaShieldAlt, FaKey } from "react-icons/fa";

interface TwoFactorAuthProps {
  userId: string;
  onSetupComplete?: () => void;
}

export default function TwoFactorAuth({ userId, onSetupComplete }: TwoFactorAuthProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setupTwoFactor();
  }, []);

  const setupTwoFactor = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setQrCode(data.qrCode);
        setSecret(data.secret);
        setBackupCodes(data.backupCodes);
      } else {
        throw new Error('Failed to setup 2FA');
      }
    } catch (error) {
      console.error('Error setting up 2FA:', error);
      setError(error instanceof Error ? error.message : 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  const verifySetup = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth/2fa/verify-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId, 
          code: verificationCode,
          secret 
        }),
      });

      if (response.ok) {
        setStep('complete');
        onSetupComplete?.();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      setError(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadBackupCodes = () => {
    const content = `Carnage Remaps 2FA Backup Codes
Generated: ${new Date().toLocaleString()}
User ID: ${userId}

IMPORTANT: Store these codes in a safe place. Each code can only be used once.

${backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n')}

If you lose access to your authenticator app, you can use these codes to regain access to your account.
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `carnage-remaps-backup-codes-${userId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading && step === 'setup') {
    return (
      <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          <span className="ml-3 text-white">Setting up 2FA...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <FaShieldAlt className="text-4xl text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-400">
          Secure your admin account with 2FA
        </p>
      </div>

      {step === 'setup' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-4">Step 1: Scan QR Code</h3>
            <p className="text-gray-400 mb-4">
              Use Google Authenticator, Authy, or another TOTP app to scan this QR code:
            </p>
            
            {qrCode && (
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
            )}
            
            <div className="bg-gray-700 p-4 rounded-lg mb-4">
              <p className="text-gray-400 text-sm mb-2">Manual entry key:</p>
              <code className="text-yellow-400 font-mono text-sm break-all">{secret}</code>
            </div>
          </div>

          <button
            onClick={() => setStep('verify')}
            className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            Continue to Verification
          </button>
        </div>
      )}

      {step === 'verify' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-4">Step 2: Verify Setup</h3>
            <p className="text-gray-400 mb-4">
              Enter the 6-digit code from your authenticator app:
            </p>
          </div>

          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg text-center text-2xl font-mono tracking-widest"
              maxLength={6}
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('setup')}
              className="flex-1 bg-gray-700 text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
            <button
              onClick={verifySetup}
              disabled={verificationCode.length !== 6 || loading}
              className="flex-1 bg-yellow-400 text-black py-3 px-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">2FA Setup Complete!</h3>
            <p className="text-gray-400 mb-4">
              Your account is now protected with two-factor authentication.
            </p>
          </div>

          <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FaKey className="text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">Backup Codes</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
                </p>
                <button
                  onClick={downloadBackupCodes}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors text-sm"
                >
                  Download Backup Codes
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-gray-700 p-4 rounded-lg">
            {backupCodes.map((code, index) => (
              <div key={index} className="font-mono text-sm text-center bg-gray-800 py-2 rounded">
                {code}
              </div>
            ))}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-green-600 transition-colors"
          >
            Complete Setup
          </button>
        </div>
      )}
    </div>
  );
}
