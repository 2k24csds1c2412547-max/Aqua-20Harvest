import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  MapPin, 
  Users, 
  Home, 
  Droplets,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

interface AssessmentData {
  name: string;
  location: string;
  state: string;
  dwellers: string;
  roofArea: string;
  roofType: string;
  openSpace: string;
  currentWaterSource: string;
  annualRainfall: string;
  soilType: string;
  geologicalCondition: string;
  groundwaterDepth: string;
  buildingArea: string;
  plotArea: string;
}

interface AssessmentResults {
  harvestPotential: number;
  systemSize: string;
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  environmentalImpact: string;
  rechargeStructures: RechargeStructure[];
  geologicalFeasibility: string;
  governmentCompliance: GovernmentCompliance;
  aquiferInfo: AquiferInfo;
  runoffCapacity: number;
}

interface RechargeStructure {
  type: string;
  dimensions: string;
  cost: number;
  suitability: string;
  specifications: string[];
}

interface GovernmentCompliance {
  mandatoryRequirement: boolean;
  complianceLevel: string;
  requiredPermits: string[];
  guidelines: string[];
}

interface AquiferInfo {
  type: string;
  depth: string;
  quality: string;
  rechargeCapacity: string;
}

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    name: "",
    location: "",
    state: "",
    dwellers: "",
    roofArea: "",
    roofType: "",
    openSpace: "",
    currentWaterSource: "",
    annualRainfall: ""
  });
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const roofTypes = [
    "Concrete/RCC", "Tiled", "Metal Sheet", "Asbestos", "Other"
  ];

  const waterSources = [
    "Municipal Supply", "Borewell", "Well", "Tanker Supply", "Mixed Sources"
  ];

  const handleInputChange = (field: keyof AssessmentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = async () => {
    setIsCalculating(true);
    
    // Simulate API call for calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation based on form data
    const roofArea = parseFloat(formData.roofArea) || 0;
    const dwellers = parseInt(formData.dwellers) || 1;
    const rainfall = parseFloat(formData.annualRainfall) || 1000;
    
    const harvestPotential = Math.round(roofArea * rainfall * 0.8 * 0.001); // Convert to kiloliters
    const systemCost = Math.round(roofArea * 200 + 25000); // Base cost calculation
    const annualSavings = Math.round(harvestPotential * 15); // Assuming ₹15 per kiloliter
    const paybackPeriod = Math.round(systemCost / Math.max(annualSavings, 1));
    
    setResults({
      harvestPotential,
      systemSize: roofArea > 100 ? "Large Scale" : roofArea > 50 ? "Medium Scale" : "Small Scale",
      estimatedCost: systemCost,
      annualSavings,
      paybackPeriod,
      environmentalImpact: `${Math.round(harvestPotential * 1000)} liters saved annually`
    });
    
    setIsCalculating(false);
    setCurrentStep(3);
  };

  const resetAssessment = () => {
    setCurrentStep(1);
    setFormData({
      name: "",
      location: "",
      state: "",
      dwellers: "",
      roofArea: "",
      roofType: "",
      openSpace: "",
      currentWaterSource: "",
      annualRainfall: ""
    });
    setResults(null);
  };

  const isStep1Valid = formData.name && formData.location && formData.state;
  const isStep2Valid = formData.dwellers && formData.roofArea && formData.roofType && 
                      formData.openSpace && formData.currentWaterSource;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          RTRWH Assessment Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get personalized recommendations for your rooftop rainwater harvesting system 
          based on your location, household needs, and property details.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={currentStep >= 1 ? "text-water-600" : ""}>Basic Info</span>
          <span className={currentStep >= 2 ? "text-water-600" : ""}>Property Details</span>
          <span className={currentStep >= 3 ? "text-water-600" : ""}>Results</span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-water-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-water-600" />
              </div>
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">City/Town *</Label>
                <Input
                  id="location"
                  placeholder="Enter your city or town"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setCurrentStep(2)}
                disabled={!isStep1Valid}
                className="bg-water-600 hover:bg-water-700"
              >
                Next Step
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Property Details */}
      {currentStep === 2 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-water-100 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-water-600" />
              </div>
              <span>Property Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dwellers">Number of Household Members *</Label>
                <Select value={formData.dwellers} onValueChange={(value) => handleInputChange("dwellers", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "person" : "people"}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">More than 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roofArea">Roof Area (sq ft) *</Label>
                <Input
                  id="roofArea"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.roofArea}
                  onChange={(e) => handleInputChange("roofArea", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type *</Label>
                <Select value={formData.roofType} onValueChange={(value) => handleInputChange("roofType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    {roofTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openSpace">Available Open Space (sq ft) *</Label>
                <Input
                  id="openSpace"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.openSpace}
                  onChange={(e) => handleInputChange("openSpace", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentWaterSource">Current Water Source *</Label>
              <Select value={formData.currentWaterSource} onValueChange={(value) => handleInputChange("currentWaterSource", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary water source" />
                </SelectTrigger>
                <SelectContent>
                  {waterSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualRainfall">Annual Rainfall (mm) - Optional</Label>
              <Input
                id="annualRainfall"
                type="number"
                placeholder="e.g., 1200 (we'll estimate if not provided)"
                value={formData.annualRainfall}
                onChange={(e) => handleInputChange("annualRainfall", e.target.value)}
              />
              <p className="text-sm text-gray-500">
                If you don't know, we'll use location-based data
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
              </Button>
              
              <Button 
                onClick={calculateResults}
                disabled={!isStep2Valid || isCalculating}
                className="bg-water-600 hover:bg-water-700"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    Calculate Results
                    <Calculator className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {currentStep === 3 && results && (
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-gradient-to-r from-water-50 to-nature-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span>Assessment Results for {formData.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Droplets className="w-8 h-8 text-water-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-water-600">{results.harvestPotential}KL</div>
                  <div className="text-sm text-gray-600">Annual Harvest Potential</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg">
                  <TrendingUp className="w-8 h-8 text-nature-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-nature-600">₹{results.annualSavings.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg">
                  <Home className="w-8 h-8 text-earth-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-earth-600">{results.paybackPeriod} years</div>
                  <div className="text-sm text-gray-600">Payback Period</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>System Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">System Size:</span>
                  <Badge variant="secondary">{results.systemSize}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Cost:</span>
                  <span className="font-semibold">₹{results.estimatedCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Roof Area Used:</span>
                  <span className="font-semibold">{formData.roofArea} sq ft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Storage Capacity:</span>
                  <span className="font-semibold">{Math.round(results.harvestPotential * 0.3)}KL recommended</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Water Conservation</div>
                    <div className="text-sm text-gray-600">{results.environmentalImpact}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Groundwater Recharge</div>
                    <div className="text-sm text-gray-600">Contributes to local groundwater levels</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Sustainable Living</div>
                    <div className="text-sm text-gray-600">Reduces dependency on external water sources</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg bg-gradient-to-r from-water-600 to-nature-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="mb-4 opacity-90">
                Contact local implementers or get detailed technical specifications for your RTRWH system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={resetAssessment}>
                  New Assessment
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-water-700">
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
