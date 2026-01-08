import { DragEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Download,
  Bot,
  Type,
  Calculator,
  Clock,
  GitMerge,
  GitBranch,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { nodeTypeConfigs } from '@/nodes';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Upload,
  Download,
  Bot,
  Type,
  Calculator,
  Clock,
  GitMerge,
  GitBranch,
};

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredNodes = nodeTypeConfigs.filter((config) =>
    config.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    config.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={cn(
        'bg-sidebar-background border-r border-sidebar-border flex flex-col relative',
        className
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-10 p-1 rounded-full bg-card border border-border hover:bg-secondary transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-sidebar-border relative">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="font-display font-bold text-sidebar-foreground mb-1">
                Node Library
              </h2>
              <p className="text-xs text-muted-foreground">
                Drag nodes onto the canvas
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 py-2 border-b border-sidebar-border"
          >
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-sm bg-secondary/50 border-sidebar-border"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
        {filteredNodes.map((config, index) => {
          const Icon = iconMap[config.icon];
          return (
            <motion.div
              key={config.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              draggable
              onDragStart={(e) => onDragStart(e as unknown as DragEvent, config.type)}
              className={cn(
                'sidebar-node-item group relative',
                isCollapsed && 'justify-center px-2'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg bg-secondary/50 transition-all group-hover:scale-110',
                config.accentClass
              )}>
                <Icon className={cn('w-4 h-4', config.accentClass)} />
              </div>

              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 min-w-0 overflow-hidden"
                  >
                    <p className="text-sm font-semibold truncate text-sidebar-foreground">
                      {config.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {config.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 border-t border-sidebar-border"
          >
            <p className="text-xs text-muted-foreground text-center font-mono">
              {filteredNodes.length} / {nodeTypeConfigs.length} nodes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}