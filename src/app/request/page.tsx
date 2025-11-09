
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  Settings,
  LayoutGrid,
  Mail,
  Send,
  X,
  User,
  Calendar,
  CheckCircle,
  PlusCircle,
  RefreshCw,
  PauseCircle,
  FilePlus,
  FileEdit,
  Save,
  Check,
  MessageSquarePlus,
  Circle,
  MapPin,
  ChevronsUpDown,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const initialRequests = [
  {
    id: 1,
    title: 'New Marketing Campaign',
    requester: 'Alice Johnson',
    avatar: '/avatars/01.png',
    city: 'New York, NY',
    date: '2024-10-28',
    deadline: '2024-11-15',
    status: 'done',
    description: 'Request to launch a new marketing campaign for the Q4 product release. Includes social media push, email marketing, and influencer collaborations. Budget approval needed.',
    notes: [],
  },
  {
    id: 2,
    title: 'Server Hardware Upgrade',
    requester: 'Bob Williams',
    avatar: '/avatars/02.png',
    city: 'San Francisco, CA',
    date: '2024-10-27',
    deadline: '2024-11-01',
    status: 'on progress',
    description: 'Urgent request to upgrade server hardware to handle increased traffic. Current infrastructure is at 90% capacity during peak hours. Detailed specs attached.',
    notes: [],
  },
  {
    id: 3,
    title: 'Office Supply Restock',
    requester: 'Charlie Brown',
    avatar: '/avatars/03.png',
    city: 'Austin, TX',
    date: '2024-10-26',
    deadline: '2024-10-30',
    status: 'on hold',
    description: 'Request for restocking general office supplies. The request was rejected as it did not follow the new procurement process. Please resubmit via the portal.',
    notes: [],
  },
  {
    id: 4,
    title: 'Travel Authorization for Conference',
    requester: 'Diana Miller',
    avatar: '/avatars/04.png',
    city: 'Chicago, IL',
    date: '2024-10-25',
    deadline: '2024-11-05',
    status: 'done',
    description: 'Authorization for travel to the Annual Tech Conference in San Francisco. Includes flight, hotel, and registration fee. Itinerary is confirmed.',
    notes: [],
  },
  {
    id: 5,
    title: 'Website UI/UX Redesign Proposal',
    requester: 'Ethan Davis',
    avatar: '/avatars/05.png',
    city: 'Seattle, WA',
    date: '2024-10-24',
    deadline: '2024-11-20',
    status: 'new',
    description: 'Proposal for a complete overhaul of the company website\'s UI/UX. Aims to improve user engagement and conversion rates. Awaiting review from the design lead.',
    notes: [],
  },
    {
    id: 6,
    title: 'New Employee Onboarding Equipment',
    requester: 'Fiona Garcia',
    avatar: '/avatars/01.png',
    city: 'Miami, FL',
    date: '2024-10-23',
    deadline: '2024-10-28',
    status: 'done',
    description: 'Request for standard onboarding equipment (laptop, monitor, keyboard) for a new software engineer starting next month. All items are standard issue.',
    notes: [],
  },
];

type Note = {
  text: string;
  author: string;
  date: string;
};

type Request = (typeof initialRequests)[0] & { notes: Note[] };

const statusConfig = {
  new: {
    icon: PlusCircle,
    color: 'text-blue-500',
    badgeVariant: 'outline',
    badgeClass: 'border-blue-500/50 text-blue-500',
  },
  'on progress': {
    icon: RefreshCw,
    color: 'text-yellow-500',
    badgeVariant: 'outline',
    badgeClass: 'border-yellow-500/50 text-yellow-500',
  },
  done: {
    icon: CheckCircle,
    color: 'text-green-500',
    badgeVariant: 'outline',
    badgeClass: 'border-green-500/50 text-green-500',
  },
  'on hold': {
    icon: PauseCircle,
    color: 'text-gray-500',
    badgeVariant: 'outline',
    badgeClass: 'border-gray-500/50 text-gray-500',
  },
} as const;

type Status = keyof typeof statusConfig;

const RequestCard = ({
  request,
  onClick,
  onAddNote,
}: {
  request: Request;
  onClick: () => void;
  onAddNote: (requestId: number, noteText: string) => void;
}) => {
  const { icon: StatusIcon, color, badgeVariant, badgeClass } = statusConfig[request.status as keyof typeof statusConfig];
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const handleSaveNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newNoteText.trim()) {
      onAddNote(request.id, newNoteText);
      setNewNoteText('');
      setIsAddingNote(false);
    }
  };

  const handleCardClick = () => {
    const activeElement = document.activeElement;
    if (activeElement?.tagName !== 'TEXTAREA' && activeElement?.tagName !== 'BUTTON') {
      onClick();
    }
  };

  return (
    <div className="widget flex flex-col">
      <Card
        className="flex-grow flex flex-col cursor-pointer hover:border-primary"
        onClick={handleCardClick}
      >
        <CardHeader className="p-4 flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">{request.title}</CardTitle>
            <div className="flex flex-col text-sm text-muted-foreground">
              <span className='font-medium'>{request.requester}</span>
               <div className="flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" />
                <span>{request.city}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Req. Date: {new Date(request.date).toLocaleDateString()}</span>
              </div>
               <div className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3 text-destructive" />
                <span>Deadline: {new Date(request.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Badge
            variant={badgeVariant}
            className={cn('whitespace-nowrap capitalize', badgeClass)}
          >
            {request.status}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {request.description}
          </p>
          {request.notes.length > 0 && (
            <div className="mt-4 bg-muted/50 rounded-lg p-3 space-y-2">
              {request.notes.map((note, index) => (
                <div key={index} className="relative pl-8">
                   {index < request.notes.length -1 && (
                    <div className="absolute left-4 top-1 h-full w-px border-l border-dashed border-border/70" />
                  )}
                  <div className="absolute left-[0.85rem] top-1">
                    <Circle className="h-2 w-2 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <div className="pr-4">{note.text}</div>
                    <div className="flex justify-end">
                        <div className="text-muted-foreground text-right whitespace-nowrap text-xs flex flex-col items-end mt-1">
                            <span>- {note.author}</span>
                            <span>
                                {new Date(note.date).toLocaleDateString()} {new Date(note.date).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col items-start">
            <div className="flex items-center justify-end text-xs text-muted-foreground w-full">
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAddingNote(!isAddingNote);
                        }}
                        >
                        <MessageSquarePlus className="h-4 w-4" />
                        <span className="sr-only">Add Note</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Note</p>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div
                className={cn(
                'w-full grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out',
                { 'grid-rows-[1fr] mt-2': isAddingNote }
                )}
            >
                <div className="overflow-hidden">
                <div className="flex items-start space-x-2">
                    <Textarea
                        placeholder="Add a quick note..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-0 h-10"
                    />
                    <Button size="icon" className="h-10 w-10 shrink-0" onClick={handleSaveNote}>
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Save Note</span>
                    </Button>
                </div>
                </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const EditRequestForm = ({ request, onCancel }: { request: Request; onCancel: () => void }) => {
  return (
    <div className="flex flex-col h-full p-2">
      <CardHeader className="p-4">
        <CardTitle>Edit Request</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" defaultValue={request.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" defaultValue={request.city} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" defaultValue={request.description} className="min-h-[150px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" defaultValue={request.deadline} />
        </div>
      </CardContent>
      <div className="p-4 border-t-0 flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary">
                <Save className="h-4 w-4" />
                <span className="sr-only">Save Changes</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Changes</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cancel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const RequestDetailView = ({ request }: { request: Request }) => {
  const { icon: StatusIcon, color } = statusConfig[request.status as keyof typeof statusConfig];
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <EditRequestForm request={request} onCancel={() => setIsEditing(false)} />;
  }
  
  return (
    <div className="flex flex-col h-full p-2">
      <CardHeader className="p-4">
        <CardTitle className="text-2xl">{request.title}</CardTitle>
        <div className="flex items-start gap-4 text-muted-foreground text-sm pt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={request.avatar} alt={request.requester} />
            <AvatarFallback>{request.requester.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{request.requester}</span>
            <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3" />
                <span>{request.city}</span>
              </div>
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3" />
              <span>Req. Date: {new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
             <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3 text-destructive" />
                <span>Deadline: {new Date(request.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <StatusIcon className={cn("h-4 w-4", color)} />
            <span className={cn('capitalize', color)}>{request.status}</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{request.description}</p>
      </CardContent>
      <div className="p-4 border-t border-border/50 flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
                <FileEdit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary">
                <CheckCircle className="h-4 w-4" />
                <span className="sr-only">Mark as Done</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as Done</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <PauseCircle className="h-4 w-4" />
                <span className="sr-only">Put on Hold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Put on Hold</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
};

const CreateRequestForm = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>New Request</DialogTitle>
      </DialogHeader>
      <div className="p-4 flex-grow space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter a title for your request" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your request in detail..." className="min-h-[150px]" />
        </div>
      </div>
      <div className="p-4 border-t-0 flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary">
                <Check className="h-4 w-4" />
                <span className="sr-only">Submit Request</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Submit Request</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cancel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

const FilterPopover = ({
  triggerLabel,
  value,
  onValueChange,
  items,
  placeholder
}: {
  triggerLabel: string;
  value: string;
  onValueChange: (value: string) => void;
  items: string[];
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const currentItem = value === 'all' ? triggerLabel : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-auto px-2 py-1 text-xs w-[150px] justify-between capitalize"
        >
          <span className='truncate'>{currentItem}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 scale-80 transform-origin-top-left">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onValueChange('all');
                  setOpen(false);
                }}
              >
                <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === 'all' ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                All
              </CommandItem>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    onValueChange(item);
                    setOpen(false);
                  }}
                  className="capitalize"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


export default function RequestPage() {
  const pageBackground = PlaceHolderImages.find(
    (img) => img.id === 'login-background'
  );
  const [activeView, setActiveView] = useState<'detail' | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [requests, setRequests] = useState<Request[]>(initialRequests as Request[]);
  const [filters, setFilters] = useState({
    status: 'all',
    city: 'all',
    requester: 'all',
  });
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  const handleRequestClick = (request: Request) => {
    setSelectedRequest(request);
    setActiveView('detail');
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveView(null);
      setSelectedRequest(null);
      setIsClosing(false);
    }, 300); // Duration of the slide-out animation
  };

  const handleAddNote = (requestId: number, noteText: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === requestId
          ? {
              ...req,
              notes: [
                ...req.notes,
                {
                  text: noteText,
                  author: 'You',
                  date: new Date().toISOString(),
                },
              ],
            }
          : req
      )
    );
  };

  const statusCounts = useMemo(() => {
    const counts = requests.reduce((acc, request) => {
      if (!acc[request.status as Status]) {
        acc[request.status as Status] = 0;
      }
      acc[request.status as Status]++;
      return acc;
    }, {} as Record<Status, number>);
    
    // Ensure all statuses from config are present
    (Object.keys(statusConfig) as Status[]).forEach(status => {
      if (!counts[status]) {
        counts[status] = 0;
      }
    });
    return counts;

  }, [requests]);

  const uniqueCities = useMemo(() => [...new Set(requests.map(req => req.city))], [requests]);
  const uniqueRequesters = useMemo(() => [...new Set(requests.map(req => req.requester))], [requests]);
  const uniqueStatuses = useMemo(() => Object.keys(statusConfig), []);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const statusMatch = filters.status === 'all' || req.status === filters.status;
      const cityMatch = filters.city === 'all' || req.city === filters.city;
      const requesterMatch = filters.requester === 'all' || req.requester === filters.requester;
      return statusMatch && cityMatch && requesterMatch;
    });
  }, [requests, filters]);

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({...prev, [filterType]: value}));
  }
  
  const animationClass = isClosing ? 'animate-slide-out-to-right' : 'animate-slide-in-from-right';

  const runCommand = (command: () => void) => {
    setSearchOpen(false)
    command()
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 lg:p-8">
      {pageBackground && (
        <Image
          src={pageBackground.imageUrl}
          alt={pageBackground.description}
          fill
          className="object-cover"
          data-ai-hint={pageBackground.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {activeView === 'detail' && selectedRequest && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 2xl:hidden" onClick={handleClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center 2xl:hidden" onClick={handleClose}>
            <div className="w-[90vw] max-w-lg" onClick={e => e.stopPropagation()}>
              <div className="relative h-full">
                  <Card className="h-full">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 z-10" onClick={handleClose}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                    <RequestDetailView request={selectedRequest} />
                  </Card>
                </div>
            </div>
          </div>
        </>
      )}

      <CommandDialog open={isSearchOpen} onOpenChange={setSearchOpen}>
        <DialogTitle className="sr-only">Search</DialogTitle>
        <CommandInput 
          placeholder="Search for a request..." 
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchValue && (
            <CommandGroup heading="Requests">
              {requests.map((request) => (
                <CommandItem
                  key={request.id}
                  onSelect={() => runCommand(() => handleRequestClick(request))}
                  value={`${request.title} ${request.requester} ${request.city}`}
                >
                  <div className='flex flex-col'>
                    <span>{request.title}</span>
                    <span className='text-xs text-muted-foreground'>{request.requester} - {request.city}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
        <Card className="relative w-[80vw] h-[80vh] rounded-xl bg-surface-dark/50 backdrop-blur-xl shadow-2xl flex flex-col">
          <CardHeader className="p-0 text-center">
          <div className="flex justify-between items-center bg-muted/50 px-2">
              <div className="w-1/3"></div>
              <div className="w-1/3 flex justify-center items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-transparent hover:border-primary rounded-xl"
                        asChild
                      >
                        <Link href="/dashboard">
                          <LayoutGrid className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-primary bg-primary/10 hover:border-primary rounded-xl"
                        asChild
                      >
                        <Link href="/request">
                          <Send className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Request</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-transparent hover:border-primary rounded-xl"
                        asChild
                      >
                        <Link href="/messages">
                          <Mail className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Messages</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="border border-transparent hover:border-primary rounded-xl"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className='w-1/3 flex justify-end items-center gap-2 pr-2'>
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="border border-transparent hover:border-primary rounded-xl" onClick={() => setSearchOpen(true)}>
                            <Search className="h-4 w-4" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Search</p>
                        <p className="text-xs text-muted-foreground">Ctrl+K</p>
                    </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="border border-transparent hover:border-primary rounded-xl">
                            <FilePlus className="h-4 w-4" />
                            <span className="sr-only">New Request</span>
                        </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>New Request</p>
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="pt-4 pb-2 flex justify-center items-center relative">
              <CardTitle>Requests</CardTitle>
            </div>
            <CardDescription className="pb-2 px-4 flex flex-wrap justify-center items-center gap-2">
                 <div className="flex gap-2">
                  <FilterPopover 
                    triggerLabel="Status"
                    value={filters.status}
                    onValueChange={(value) => handleFilterChange('status', value)}
                    items={uniqueStatuses}
                    placeholder="Filter by status..."
                  />
                  <FilterPopover 
                    triggerLabel="City"
                    value={filters.city}
                    onValueChange={(value) => handleFilterChange('city', value)}
                    items={uniqueCities}
                    placeholder="Filter by city..."
                  />
                  <FilterPopover 
                    triggerLabel="Requester"
                    value={filters.requester}
                    onValueChange={(value) => handleFilterChange('requester', value)}
                    items={uniqueRequesters}
                    placeholder="Filter by requester..."
                  />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 overflow-y-auto flex-grow">
            <div className="grid grid-cols-1 2xl:grid-cols-4 gap-4 h-full">
              <div className={cn(
                  "h-full overflow-y-auto pr-2 transition-all duration-300 ease-in-out",
                  activeView ? "2xl:col-span-3" : "2xl:col-span-4"
                )}>
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }} className="w-full h-full">
                  <div className="dashboard-grid mx-auto max-w-5xl">
                    {filteredRequests.map(req => (
                      <RequestCard
                        key={req.id}
                        request={req}
                        onClick={() => handleRequestClick(req)}
                        onAddNote={handleAddNote}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {activeView === 'detail' && selectedRequest && (
              <div className={cn("hidden 2xl:block 2xl:col-span-1 h-full", animationClass)}>
                  <div className="relative h-full">
                      <Card className="h-full">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 z-10" onClick={handleClose}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close</span>
                        </Button>
                        <RequestDetailView request={selectedRequest} />
                      </Card>
                  </div>
              </div>
              )}
            </div>
          </CardContent>
        </Card>
        <DialogContent className="sm:max-w-[425px]">
          <CreateRequestForm onCancel={() => setCreateDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
    </main>
  );
}
    

    




    

    



    

    

    

    




    

    

    

