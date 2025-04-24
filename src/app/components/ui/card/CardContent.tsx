"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("card-header p-6", className)} {...props}>
      {children}
    </div>
  );
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={cn("card-body p-6 pt-2", className)} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div 
      className={cn("card-footer p-6 border-t border-base-200", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function CardTitle({ 
  className, 
  children, 
  as: Component = "h3", 
  ...props 
}: CardTitleProps) {
  return (
    <Component 
      className={cn("card-title text-xl font-semibold", className)} 
      {...props}
    >
      {children}
    </Component>
  );
}

export interface CardDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CardDivider({ className, ...props }: CardDividerProps) {
  return (
    <div 
      className={cn("divider my-2", className)} 
      {...props}
    />
  );
} 