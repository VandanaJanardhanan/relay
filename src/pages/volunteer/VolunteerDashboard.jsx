import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { TaskCard } from '../../components/tasks/TaskCard';
import { CampaignCard } from '../../components/campaigns/CampaignCard';
import { EmptyState } from '../../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  HandHelping, 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Compass
} from 'lucide-react';

export const VolunteerDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    campaigns, 
    availableTasks, 
    myTasks 
  } = useData();

  const myInProgress = myTasks.filter((t) => t.status === 'In Progress').length;
  const myCompleted = myTasks.filter((t) => t.status === 'Completed').length;

  return (
    <DashboardLayout title="Volunteer Overview">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5" />
              Community Volunteer
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
              Welcome, {currentUser?.fullName || 'Volunteer'}!
            </h2>
            <p className="text-xs sm:text-sm text-[#6B778C] mt-1">
              Your contribution makes a difference. Here's where you can help today.
            </p>
          </div>

          <Link
            to="/volunteer/available-tasks"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
          >
            <HandHelping className="w-4 h-4" />
            Browse Available Tasks ({availableTasks.length})
          </Link>
        </div>

        {/* 4 Volunteer Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Available Tasks"
            value={availableTasks.length}
            icon={HandHelping}
            description="Open responsibilities waiting for a volunteer"
            accent={availableTasks.length > 0 ? "warning" : "default"}
            badgeText={availableTasks.length > 0 ? "Can claim now" : null}
            linkTo="/volunteer/available-tasks"
          />

          <StatCard
            label="My Assigned Tasks"
            value={myTasks.length}
            icon={ListTodo}
            description="Your current active commitments"
            accent="primary"
            linkTo="/volunteer/my-tasks"
          />

          <StatCard
            label="In Progress"
            value={myInProgress}
            icon={Clock}
            description="Tasks you are actively working on"
            accent="default"
            linkTo="/volunteer/my-tasks"
          />

          <StatCard
            label="Completed Tasks"
            value={myCompleted}
            icon={CheckCircle2}
            description="Milestones delivered to the community"
            accent="success"
            linkTo="/volunteer/my-tasks"
          />
        </div>

        {/* Available Tasks Preview (Take This Task) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#172B4D]">
                Tasks Needing Volunteers ({availableTasks.length})
              </h3>
              <p className="text-xs text-[#6B778C]">
                Take ownership of an initiative task and coordinate directly with organizers
              </p>
            </div>

            {availableTasks.length > 0 && (
              <Link
                to="/volunteer/available-tasks"
                className="text-xs font-bold text-[#16A6A1] hover:underline flex items-center gap-1"
              >
                View all available →
              </Link>
            )}
          </div>

          {availableTasks.length === 0 ? (
            <EmptyState
              type="noAvailableTasks"
              title="You're all caught up!"
              description="There are currently no unassigned tasks waiting for volunteers. Explore active campaigns below."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} showCampaign={true} />
              ))}
            </div>
          )}
        </div>

        {/* My Tasks Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#172B4D]">
                My Responsibilities ({myTasks.length})
              </h3>
              <p className="text-xs text-[#6B778C]">
                Tasks assigned to you. Keep your status updated so organizers can see your progress.
              </p>
            </div>

            {myTasks.length > 0 && (
              <Link
                to="/volunteer/my-tasks"
                className="text-xs font-bold text-[#16A6A1] hover:underline flex items-center gap-1"
              >
                Manage all my tasks →
              </Link>
            )}
          </div>

          {myTasks.length === 0 ? (
            <EmptyState
              type="noMyTasks"
              actionLabel="Claim an Available Task"
              actionTo="/volunteer/available-tasks"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myTasks.slice(0, 3).map((task) => (
                <TaskCard key={task.id} task={task} showCampaign={true} />
              ))}
            </div>
          )}
        </div>

        {/* Active Campaigns Discovery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#172B4D]">
                Community Campaigns
              </h3>
              <p className="text-xs text-[#6B778C]">
                Active initiatives taking place on campus and across the local community
              </p>
            </div>

            <Link
              to="/volunteer/campaigns"
              className="text-xs font-bold text-[#16A6A1] hover:underline flex items-center gap-1"
            >
              Explore all campaigns →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.slice(0, 3).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

