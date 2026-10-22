import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Power, 
  PowerOff,
  Hotel, 
  Bus, 
  Utensils, 
  Clock, 
  LayoutGrid, 
  Table as TableIcon,
  X,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { AdminPackageItem, PackageCategory, PackageStatus } from '../types/adminTypes';
import { PackageEditModal } from './PackageEditModal';
import { PackagePreviewModal } from './PackagePreviewModal';
import { ConfirmModal } from '../components/ConfirmModal';

interface PackagesViewProps {
  packages: AdminPackageItem[];
  onAddPackage: (pkg: AdminPackageItem) => void;
  onUpdatePackage: (pkg: AdminPackageItem) => void;
  onDeletePackage: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  isAddModalOpenInitially?: boolean;
  onCloseAddModalInitially?: () => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  packages,
  onAddPackage,
  onUpdatePackage,
  onDeletePackage,
  onToggleStatus,
  onShowToast,
  isAddModalOpenInitially = false,
  onCloseAddModalInitially,
}) => {
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | PackageCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | PackageStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(isAddModalOpenInitially);
  const [editingPackage, setEditingPackage] = useState<AdminPackageItem | null>(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewingPackage, setPreviewingPackage] = useState<AdminPackageItem | null>(null);

  // Confirmation Modal state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    isDestructive?: boolean;
    action: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    action: () => {},
  });

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesSearch = 
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.makkahHotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.madinahHotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [packages, searchTerm, categoryFilter, statusFilter]);

  const handleOpenAdd = () => {
    setEditingPackage(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (pkg: AdminPackageItem) => {
    setEditingPackage(pkg);
    setIsEditModalOpen(true);
  };

  const handleOpenPreview = (pkg: AdminPackageItem) => {
    setPreviewingPackage(pkg);
    setIsPreviewModalOpen(true);
  };

  const handleSaveModal = (pkg: AdminPackageItem) => {
    if (editingPackage) {
      onUpdatePackage(pkg);
      onShowToast('Package Updated', `"${pkg.name}" has been modified in local session.`, 'success');
    } else {
      onAddPackage(pkg);
      onShowToast('Package Created', `New package "${pkg.name}" added to list.`, 'success');
    }
    setIsEditModalOpen(false);
    setEditingPackage(null);
    if (onCloseAddModalInitially) onCloseAddModalInitially();
  };

  const handleToggleStatusClick = (pkg: AdminPackageItem) => {
    const isActivating = pkg.status === 'inactive';
    setConfirmDialog({
      isOpen: true,
      title: isActivating ? 'Activate Package?' : 'Deactivate Package?',
      message: isActivating
        ? `Are you sure you want to activate "${pkg.name}"? It will become visible in the live package inventory.`
        : `Are you sure you want to deactivate "${pkg.name}"? It will be marked as hidden/inactive.`,
      confirmLabel: isActivating ? 'Activate' : 'Deactivate',
      isDestructive: !isActivating,
      action: () => {
        onToggleStatus(pkg.id);
        onShowToast(
          isActivating ? 'Package Activated' : 'Package Deactivated',
          `"${pkg.name}" is now ${isActivating ? 'active' : 'inactive'}.`,
          'info'
        );
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDeleteClick = (pkg: AdminPackageItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Package?',
      message: `Are you sure you want to delete "${pkg.name}"? This action cannot be undone.`,
      confirmLabel: 'Delete',
      isDestructive: true,
      action: () => {
        onDeletePackage(pkg.id);
        onShowToast('Package Removed', `"${pkg.name}" has been deleted from local session.`, 'warning');
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by package, hotel, or feature..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Button & View Toggle */}
          <div className="flex items-center gap-2">
            {/* View Grid / Table Switcher */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid Cards View"
                aria-label="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Table View"
                aria-label="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Add Package Button */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Package</span>
            </button>
          </div>
        </div>

        {/* Filter Pills / Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filters:
          </span>

          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {(['all', 'economy', 'standard', 'premium'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Categories' : `${cat} Umrah`}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
            {(['all', 'active', 'inactive'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-[#2563EB] hover:underline font-semibold ml-2 cursor-pointer"
            >
              Reset filters
            </button>
          )}

          <div className="ml-auto text-slate-400 text-[11px] tabular-nums">
            Showing <strong>{filteredPackages.length}</strong> of {packages.length} packages
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">No Umrah packages found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No packages matched your search criteria or active filters. Try adjusting the search term or category.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
            >
              Add New Package
            </button>
          </div>
        </div>
      )}

      {/* Grid Cards View */}
      {viewMode === 'grid' && filteredPackages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col overflow-hidden group"
            >
              {/* Image Preview Banner */}
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                {pkg.imageUrl ? (
                  <img
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Package className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs shadow-xs">
                    {pkg.category} Umrah
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs ${
                      pkg.status === 'active'
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-slate-700/90 text-slate-200'
                    }`}
                  >
                    {pkg.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Price on Image Bottom */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                  <span className="text-[11px] text-slate-200">{pkg.duration}</span>
                  <span className="text-base font-extrabold text-[#F5D58A] font-mono tabular-nums drop-shadow-sm">
                    {pkg.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pkg.shortDescription}
                  </p>
                </div>

                {/* Hotel & Amenities Strip */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <Hotel className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate"><strong>Makkah:</strong> {pkg.makkahHotel.split('/')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Hotel className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate"><strong>Madinah:</strong> {pkg.madinahHotel.split('/')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Bus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pkg.transport}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Utensils className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pkg.meals}</span>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleStatusClick(pkg)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      pkg.status === 'active'
                        ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                        : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                    title={pkg.status === 'active' ? 'Deactivate package' : 'Activate package'}
                  >
                    {pkg.status === 'active' ? (
                      <>
                        <PowerOff className="w-3 h-3" />
                        <span>Deactivate</span>
                      </>
                    ) : (
                      <>
                        <Power className="w-3 h-3" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenPreview(pkg)}
                      className="p-1.5 text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Preview package"
                      aria-label="Preview package"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(pkg)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit package"
                      aria-label="Edit package"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(pkg)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete package"
                      aria-label="Delete package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && filteredPackages.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Package</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price / Person</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Hotels</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          {pkg.imageUrl ? (
                            <img
                              src={pkg.imageUrl}
                              alt={pkg.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400 m-auto mt-2" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="font-bold text-slate-900 truncate">{pkg.name}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {pkg.shortDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-900 font-mono tabular-nums whitespace-nowrap">
                      {pkg.price}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {pkg.duration}
                    </td>
                    <td className="py-3.5 px-3 max-w-xs truncate text-[11px] text-slate-500">
                      <div>M: {pkg.makkahHotel.split('/')[0]}</div>
                      <div>M: {pkg.madinahHotel.split('/')[0]}</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          pkg.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${pkg.status === 'active' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                        {pkg.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleStatusClick(pkg)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title={pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {pkg.status === 'active' ? (
                            <PowerOff className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Power className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(pkg)}
                          className="p-1.5 text-slate-500 hover:text-[#2563EB] rounded-lg hover:bg-blue-50 cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(pkg)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(pkg)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Package Edit / Add Modal */}
      <PackageEditModal
        isOpen={isEditModalOpen}
        packageToEdit={editingPackage}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingPackage(null);
          if (onCloseAddModalInitially) onCloseAddModalInitially();
        }}
        onSave={handleSaveModal}
      />

      {/* Package Preview Modal */}
      <PackagePreviewModal
        isOpen={isPreviewModalOpen}
        packageItem={previewingPackage}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewingPackage(null);
        }}
        onEdit={(pkg) => {
          setIsPreviewModalOpen(false);
          handleOpenEdit(pkg);
        }}
      />

      {/* Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        isDestructive={confirmDialog.isDestructive}
        onConfirm={confirmDialog.action}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
