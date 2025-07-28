import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "@phosphor-icons/react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  regulation?: string;
  minDeposit?: string;
  rating?: string;
  accountType?: string;
}

export function SearchFilters({ onSearch, onFilter }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onFilter({});
  };

  const activeFiltersCount = Object.keys(filters).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="ابحث عن وسيط..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal size={20} />
          فلترة
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">التنظيم</label>
              <Select onValueChange={(value) => handleFilterChange('regulation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنظم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CMA">هيئة السوق المالية (CMA)</SelectItem>
                  <SelectItem value="SAMA">مؤسسة النقد العربي (SAMA)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">الحد الأدنى للإيداع</label>
              <Select onValueChange={(value) => handleFilterChange('minDeposit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المبلغ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-5000">أقل من 5,000 ريال</SelectItem>
                  <SelectItem value="5000-15000">5,000 - 15,000 ريال</SelectItem>
                  <SelectItem value="15000-30000">15,000 - 30,000 ريال</SelectItem>
                  <SelectItem value="30000+">أكثر من 30,000 ريال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">التقييم</label>
              <Select onValueChange={(value) => handleFilterChange('rating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4+">4 نجوم فأكثر</SelectItem>
                  <SelectItem value="3+">3 نجوم فأكثر</SelectItem>
                  <SelectItem value="2+">2 نجوم فأكثر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">نوع الحساب</label>
              <Select onValueChange={(value) => handleFilterChange('accountType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="islamic">حساب إسلامي</SelectItem>
                  <SelectItem value="standard">حساب قياسي</SelectItem>
                  <SelectItem value="vip">حساب VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">الفلاتر النشطة:</span>
              {Object.entries(filters).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 hover:bg-transparent"
                    onClick={() => clearFilter(key as keyof FilterOptions)}
                  >
                    <X size={12} />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-destructive hover:text-destructive"
              >
                مسح الكل
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}