"use client";
import React, { useState } from 'react';
import { useOrganizations } from '../../../context/organizationContext';
import Button from '../../../components/button/button';
import Input from '../../../components/input/input';
import CreateOrganizationModal from '../../../components/modals/createOrganizationModal';
import { Formik } from 'formik';
import { createOrganizationSchema } from '../../../schema/organizationSchema';

export default function OrganizationsPage() {
  const { organizations, currentOrg, selectOrganization, addTeam, removeTeam } = useOrganizations();
  const [teamName, setTeamName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const handleAddTeam = async () => {
    if (!teamName || !currentOrg) return;
    await addTeam({ name: teamName });
    setTeamName('');
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-dark-bg p-4 rounded-lg border border-gray-500/[0.1] dark:border-gray-500/[0.2]">
        <h1 className="text-2xl font-semibold">Organizations</h1>
        <Button onClick={() => setShowCreate(true)} size="medium">Create Organization</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-dark-bg border border-gray-500/[0.1] dark:border-gray-500/[0.2] rounded-lg">
        <div className="col-span-1">
          <h3 className="mb-2 text-sm text-gray-400">Your organizations</h3>
          <div className="flex flex-col gap-2">
            {organizations.length === 0 && <div className="text-gray-500">No organizations yet</div>}
            {organizations.map(org => (
              <div key={org.$id} className={`p-3 rounded-lg border ${currentOrg?.$id === org.$id ? 'border-primary bg-bg-gray-100' : 'border-border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{org.name}</div>
                    <div className="text-xs text-gray-500">{org.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={() => selectOrganization(org.$id)} variant="secondary">Select</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="mb-2 text-sm text-gray-400">Current organization</h3>
          {!currentOrg ? (
            <div className="text-gray-500">Select an organization to manage teams and members.</div>
          ) : (
            <div className="p-4 rounded-lg border border-border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold">{currentOrg.name}</h2>
                  <div className="text-xs text-gray-500">{currentOrg.description}</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Teams</h4>
                <div className="flex gap-2 mb-3">
                  <input value={teamName} onChange={(e:any) => setTeamName(e.target.value)} placeholder="Team name" />
                  <Button onClick={handleAddTeam} variant="primary">Add team</Button>
                </div>
                <div className="flex flex-col gap-2">
                  {(currentOrg.teams || []).map(team => (
                    <div key={team.$id} className="flex items-center justify-between p-2 border rounded">
                      <div>{team.name}</div>
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => removeTeam(currentOrg.$id, team.$id)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Members</h4>
                <div className="flex flex-col gap-2">
                  {(currentOrg.members || []).map(m => (
                    <div key={m.$id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{m.name || m.email}</div>
                        <div className="text-xs text-gray-500">{m.role}</div>
                      </div>
                      <div className="text-xs text-gray-400">{m.email}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    <CreateOrganizationModal isOpen={showCreate} onClose={() => setShowCreate(false)} />
  </div>
  )
}
