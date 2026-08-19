import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Enterprise-grade Error Boundary to catch UI runtime crashes gracefully
 * and provide crash-monitoring hooks ready for Google Play release.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Console log in dev/prod - ready for Crashlytics/Sentry forwarder
    console.error('App Uncaught Exception caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      window.location.href = window.location.pathname + '?tab=workout';
    } catch (e) {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="min-h-screen w-full flex items-center justify-center p-6 bg-[#0D0A08] text-white select-none"
          dir="rtl"
        >
          <div className="w-full max-w-sm p-6 rounded-3xl bg-[#161618] border border-white/10 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-black text-white">
                تنبيه تشغيل غير متوقع
              </h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                واجه التطبيق استثناءً غير متوقع، جميع بياناتك محفوظة بأمان. اضغط أدناه لإعادة تشغيل الواجهة.
              </p>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full py-3 px-4 bg-[#FF5F2E] hover:bg-[#FF912E] text-white text-xs font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF5F2E]/20 transition-all active:scale-98 cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span>إعادة تشغيل التطبيق</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
