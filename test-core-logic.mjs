import assert from 'node:assert';
import { isTaskUnassigned, TASK_STATUSES } from './src/utils/taskUtils.js';
import { INITIAL_USERS, INITIAL_CAMPAIGNS, INITIAL_TASKS } from './src/services/mockData.js';

console.log('--- RUNNING RELAY CORE LOGIC UNIT TESTS ---');

// Test 1: Centralized Automatic Unassigned Task Detection
console.log('Test 1: isTaskUnassigned verification...');
assert.strictEqual(isTaskUnassigned(null), false);
assert.strictEqual(isTaskUnassigned(undefined), false);
assert.strictEqual(isTaskUnassigned({ assignedVolunteerId: null }), true);
assert.strictEqual(isTaskUnassigned({ assignedVolunteerId: undefined }), true);
assert.strictEqual(isTaskUnassigned({ assignedVolunteerId: '' }), true);
assert.strictEqual(isTaskUnassigned({ assignedVolunteerId: 'user-vol-1' }), false);
console.log('✓ Test 1 passed: Centralized unassigned detection strictly checks assignedVolunteerId');

// Test 2: Standard Hackathon Demo Scenario Verification
console.log('Test 2: Standard Hackathon demo scenario verification...');
const campusCleanup = INITIAL_CAMPAIGNS.find(c => c.id === 'campaign-campus-cleanup');
assert.ok(campusCleanup, 'Campus Clean-up Drive campaign exists');
assert.strictEqual(campusCleanup.title, 'Campus Clean-up Drive');
assert.strictEqual(campusCleanup.location.includes('Yenepoya Institute of Technology'), true);

const cleanupTasks = INITIAL_TASKS.filter(t => t.campaignId === 'campaign-campus-cleanup');
assert.strictEqual(cleanupTasks.length, 4, 'Has 4 sample tasks for Campus Clean-up Drive');

const task1 = cleanupTasks.find(t => t.title === 'Arrange Cleaning Materials');
assert.ok(task1);
assert.strictEqual(task1.status, 'Completed');
assert.strictEqual(isTaskUnassigned(task1), false);
assert.strictEqual(task1.assignedVolunteerName, 'Aisha');

const task2 = cleanupTasks.find(t => t.title === 'Recruit Participants');
assert.ok(task2);
assert.strictEqual(task2.status, 'In Progress');
assert.strictEqual(isTaskUnassigned(task2), false);
assert.strictEqual(task2.assignedVolunteerName, 'Rahul');

// Core Differentiator Task
const task3 = cleanupTasks.find(t => t.title === 'Arrange Waste Collection');
assert.ok(task3);
assert.strictEqual(task3.status, 'Pending');
assert.strictEqual(task3.assignedVolunteerId, null);
assert.strictEqual(isTaskUnassigned(task3), true, 'Arrange Waste Collection must be unassigned!');

const task4 = cleanupTasks.find(t => t.title === 'Document the Event');
assert.ok(task4);
assert.strictEqual(task4.status, 'Pending');
assert.strictEqual(isTaskUnassigned(task4), false);
assert.strictEqual(task4.assignedVolunteerName, 'Meera');

// Expected Dashboard statistics
const completedCount = cleanupTasks.filter(t => t.status === 'Completed').length;
const unassignedCount = cleanupTasks.filter(isTaskUnassigned).length;
assert.strictEqual(completedCount, 1, 'Completed tasks count = 1');
assert.strictEqual(unassignedCount, 1, 'Unassigned tasks count = 1');
console.log('✓ Test 2 passed: Standard demo counts and unassigned differentiation match requirements');

// Test 3: Team Converge & Yenepoya Identity
console.log('Test 3: Team CONVERGE identity verification...');
const organizer = INITIAL_USERS.find(u => u.role === 'organizer');
assert.ok(organizer);
assert.strictEqual(organizer.fullName, 'Vandana C');
assert.strictEqual(organizer.institution, 'Yenepoya Institute of Technology');
console.log('✓ Test 3 passed: Team CONVERGE identity confirmed');

console.log('\nALL 3 TEST SUITES PASSED! Core business rules, data structures, and demo state verified.');

