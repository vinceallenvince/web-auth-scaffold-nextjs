'use client';

import React from 'react';
import { useTranslations } from '@/i18n';

export default function I18nDemoPage() {
  const { t, locale } = useTranslations();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="prose lg:prose-xl mx-auto">
        <h1>{t('common.navigation.home')}</h1>
        <p className="lead">
          {locale === 'en' ? 'Current language: English' : 'Idioma actual: Español'}
        </p>
        
        <div className="divider"></div>
        
        <h2>Navigation</h2>
        <ul>
          <li><strong>Home:</strong> {t('common.navigation.home')}</li>
          <li><strong>Examples:</strong> {t('common.navigation.examples')}</li>
          <li><strong>Hello World:</strong> {t('common.navigation.helloworld')}</li>
          <li><strong>Profile:</strong> {t('common.navigation.profile')}</li>
        </ul>
        
        <h2>Buttons</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-primary">{t('common.buttons.submit')}</button>
          <button className="btn btn-secondary">{t('common.buttons.cancel')}</button>
          <button className="btn btn-accent">{t('common.buttons.save')}</button>
          <button className="btn btn-ghost loading">{t('common.buttons.loading')}</button>
        </div>
        
        <h2>Authentication</h2>
        <ul>
          <li><strong>Sign In:</strong> {t('auth.signin')}</li>
          <li><strong>Sign Out:</strong> {t('auth.signout')}</li>
          <li><strong>Email:</strong> {t('auth.email')}</li>
          <li><strong>Password:</strong> {t('auth.password')}</li>
          <li><strong>Forgot Password:</strong> {t('auth.forgotPassword')}</li>
          <li><strong>Magic Link:</strong> {t('auth.magicLink')}</li>
        </ul>
        
        <h2>Profile</h2>
        <ul>
          <li><strong>Title:</strong> {t('profile.title')}</li>
          <li><strong>Name:</strong> {t('profile.name')}</li>
          <li><strong>Email:</strong> {t('profile.email')}</li>
          <li><strong>Member since:</strong> {t('profile.joinDate')}</li>
        </ul>
        
        <h2>Errors</h2>
        <div className="alert alert-error">
          <span>{t('errors.general')}</span>
        </div>
        <div className="alert alert-warning mt-2">
          <span>{t('errors.sessionExpired')}</span>
        </div>
        <div className="alert alert-info mt-2">
          <span>{t('errors.invalidInput')}</span>
        </div>
      </div>
    </div>
  );
} 