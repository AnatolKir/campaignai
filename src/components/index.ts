// Standardized Components Following Campaign.ai Rules System

// Modals & Dialogs Rule
export { Modal } from './Modal';

// Notifications & Alerts Rule
export { Toast, type ToastType } from './Toast';
export { NotificationCard } from './NotificationCard';
export { AlertBanner } from './AlertBanner';

// Data Tables & Lists Rule
export { Table, type TableColumn } from './Table';

// Error Pages & Empty States Rule
export { EmptyState } from './EmptyState';

// Loading State & Skeletons Rule
export { 
  Skeleton, 
  PostSkeleton, 
  TableSkeleton, 
  CardSkeleton, 
  DashboardSkeleton, 
  ChatSkeleton 
} from './SkeletonLoader';

// Chat & Messaging Rule
export { 
  ChatWindow, 
  MessageBubble, 
  MessageInput, 
  type Message 
} from './Chat';

// Activity Feed & Logs Rule
export { 
  ActivityFeed, 
  createActivityItem, 
  type ActivityItem 
} from './ActivityFeed';

// External Link & Social Sharing Rule
export { ExternalLink, SocialShare } from './ExternalLink';

// Existing Components (already compliant with rules)
export { UnifiedNavigation } from './UnifiedNavigation';
export { ValidatedRadioGroup, ValidatedCheckbox, ValidatedSelect } from './ValidatedFormField';
export { SettingsValidationAlert } from './SettingsValidationAlert';
export { default as ImageCropper } from './ImageCropper';
export { default as RichTextEditor } from './RichTextEditor';
export { BrandSwitcher } from './BrandSwitcher';
export { CreateBrandModal } from './CreateBrandModal';
export { CompetitorDetailModal } from './CompetitorDetailModal';
export { ReportConfigModal } from './ReportConfigModal'; 