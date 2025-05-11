import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

@Entity('apa_property')
export class ApaPropertyEntity {
  @PrimaryGeneratedColumn({ name: 'property_id', unsigned: true })
  propertyId: number;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'agent_id', type: 'int', unsigned: true })
  agentId: number;

  @Column({ name: 'zoooffice_id', type: 'int', unsigned: true, nullable: true })
  zooofficeId: number | null;

  @Column({ name: 'source_id', type: 'varchar', length: 32, default: '' })
  sourceId: string;

  @Column({ name: 'progress', type: 'tinyint' })
  progress: number;

  @Column({ name: 'category', type: 'tinyint', unsigned: true })
  category: number;

  @Column({ name: 'type', type: 'tinyint', unsigned: true })
  type: number;

  @Column({ name: 'stage', type: 'tinyint', unsigned: true })
  stage: number;

  @Column({ name: 'sale', type: 'tinyint', unsigned: true })
  sale: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'description', type: 'varchar', length: 64, nullable: true })
  description: string | null;

  @Column({ name: 'address', type: 'varchar', length: 64, default: '' })
  address: string;

  @Column({ name: 'alternate_address', type: 'varchar', length: 250, nullable: true })
  alternateAddress: string | null;

  @Column({ name: 'suburb_id', type: 'int', unsigned: true, default: 0 })
  suburbId: number;

  @Column({ name: 'hide_address', type: 'tinyint', unsigned: true, default: 0 })
  hideAddress: number;

  @Column({ name: 'hide_streetview', type: 'tinyint', unsigned: true })
  hideStreetview: number;

  @Column({ name: 'beds', type: 'tinyint', unsigned: true, default: 0 })
  beds: number;

  @Column({ name: 'min_bed', type: 'tinyint' })
  minBed: number;

  @Column({ name: 'max_bed', type: 'tinyint' })
  maxBed: number;

  @Column({ name: 'min_bath', type: 'int', nullable: true })
  minBath: number | null;

  @Column({ name: 'max_bath', type: 'int', nullable: true })
  maxBath: number | null;

  @Column({ name: 'min_car', type: 'int', nullable: true })
  minCar: number | null;

  @Column({ name: 'max_car', type: 'int', nullable: true })
  maxCar: number | null;

  @Column({ name: 'baths', type: 'tinyint', unsigned: true, default: 0 })
  baths: number;

  @Column({ name: 'website', type: 'varchar', length: 100 })
  website: string;

  @Column({ name: 'virtual_tour', type: 'varchar', length: 255 })
  virtualTour: string;

  @Column({ name: 'cars', type: 'int', unsigned: true, default: 0 })
  cars: number;

  @Column({ name: 'price', type: 'int', unsigned: true, default: 0 })
  price: number;

  @Column({ name: 'min_price', type: 'int' })
  minPrice: number;

  @Column({ name: 'max_price', type: 'int' })
  maxPrice: number;

  @Column({ name: 'price_text', type: 'varchar', length: 50, default: '' })
  priceText: string;

  @Column({ name: 'price_display', type: 'enum', enum: ['0', '1', '2', '3', ''], nullable: true })
  priceDisplay: string | null;

  @Column({ name: 'hide_price', type: 'tinyint', unsigned: true, default: 0 })
  hidePrice: number;

  @Column({ name: 'house_size', type: 'int', unsigned: true, default: 0 })
  houseSize: number;

  @Column({ name: 'land_size', type: 'int', unsigned: true, default: 0 })
  landSize: number;

  @Column({ name: 'lat', type: 'double', nullable: true })
  lat: number | null;

  @Column({ name: 'lng', type: 'double', nullable: true })
  lng: number | null;

  @Column({ name: 'featured_id', type: 'int', unsigned: true, default: 0 })
  featuredId: number;

  @Column({ name: 'company_name', type: 'varchar', length: 64 })
  companyName: string;

  @Column({ name: 'village_name', type: 'varchar', length: 64 })
  villageName: string;

  @Column({ name: 'unit_no', type: 'varchar', length: 50 })
  unitNo: string;

  @Column({ name: 'postcode', type: 'tinyint' })
  postcode: number;

  @Column({ name: 'order', type: 'int', unsigned: true })
  order: number;

  @Column({ name: 'expiry_property', type: 'int' })
  expiryProperty: number;

  @Column({ name: 'renew_date', type: 'int', nullable: true })
  renewDate: number | null;

  @Column({ name: 'is_budget', type: 'tinyint', default: 0 })
  isBudget: number;

  @Column({ name: 'is_basic', type: 'tinyint', default: 0 })
  isBasic: number;

  @Column({ name: 'is_approval', type: 'int', unsigned: true, nullable: true })
  isApproval: number | null;

  @Column({ name: 'approval_status', type: 'int', unsigned: true, nullable: true })
  approvalStatus: number | null;

  @Column({ name: 'approved_at', type: 'int', unsigned: true, nullable: true })
  approvedAt: number | null;

  @Column({ name: 'declined_at', type: 'int', unsigned: true, nullable: true })
  declinedAt: number | null;

  @Column({ name: 'approval_token', type: 'varchar', length: 255, nullable: true })
  approvalToken: string | null;

  @Column({ name: 'display_phone_number', type: 'tinyint', default: 1 })
  displayPhoneNumber: number;

  @Column({ name: 'newsletter_sent', type: 'int', unsigned: true, nullable: true })
  newsletterSent: number | null;

  @Column({ name: 'suburb_newsletter_sent', type: 'int', nullable: true })
  suburbNewsletterSent: number | null;

  @Column({ name: 'last_exported', type: 'int', default: 0 })
  lastExported: number;

  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId: number | null;

  @Column({ name: 'is_clone', type: 'tinyint', default: 0 })
  isClone: number;

  @Column({ name: 'building_name', type: 'varchar', length: 255, nullable: true })
  buildingName: string | null;

  @Column({ name: 'map_display_type', type: 'varchar', length: 75, nullable: true })
  mapDisplayType: string | null;

  @Column({ name: 'street_number', type: 'varchar', length: 30, nullable: true })
  streetNumber: string | null;

  @Column({ name: 'garage', type: 'tinyint', default: 0 })
  garage: number;

  @Column({ name: 'no_of_spaces', type: 'int', nullable: true })
  noOfSpaces: number | null;

  @Column({ name: 'is_project', type: 'int', nullable: true })
  isProject: number | null;

  @Column({ name: 'created', type: 'int', unsigned: true })
  created: number;

  @Column({ name: 'updated', type: 'int', unsigned: true, default: 0 })
  updated: number;

  @Column({ name: 'last_failed_sync', type: 'int', unsigned: true, nullable: true })
  lastFailedSync: number | null;

  @Column({ name: 'deleted', type: 'int', unsigned: true, nullable: true })
  deleted: number | null;

  @Column({ name: 'refreshed_at', type: 'int', unsigned: true, nullable: true })
  refreshedAt: number | null;

  @Column({ name: 'project_description', type: 'varchar', length: 255, nullable: true })
  projectDescription: string | null;

  @Column({ name: 'address_option', type: 'tinyint', default: 0 })
  addressOption: number;

  @Column({ name: 'contact_option', type: 'tinyint', default: 0 })
  contactOption: number;

  @Column({ name: 'price_multiple', type: 'tinyint', default: 0 })
  priceMultiple: number;

  @Column({ name: 'is_serviced_area_national', type: 'tinyint', default: 0 })
  isServicedAreaNational: number;

  @Column({ name: 'sold_at', type: 'int', unsigned: true, nullable: true })
  soldAt: number | null;

  @Column({ name: 'under_offer_at', type: 'int', unsigned: true, nullable: true })
  underOfferAt: number | null;

  @Column({ name: 'meilisearch_synced_at', type: 'int', unsigned: true, nullable: true })
  meilisearchSyncedAt: number | null;

  @Column({ name: 'meilisearch_sync_id', type: 'int', unsigned: true, nullable: true })
  meilisearchSyncId: number | null;
}
