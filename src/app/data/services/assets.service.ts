import { Injectable } from '@angular/core';
import {
  IAsset,
  IAssetAssignment,
  IAssetCategory,
  IAssetLot,
  IRequestAsset,
} from '@models/organizations.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AssetService extends BaseService<IAsset> {
  override collectionName = 'assets';
}

@Injectable()
export class AssetAssignmentsService extends BaseService<IAssetAssignment> {
  override collectionName: string = 'asset-assignments';
}

@Injectable()
export class AssetLotsService extends BaseService<IAssetLot> {
  override collectionName: string = 'asset-lots';
}

@Injectable()
export class AssetCategoriesService extends BaseService<IAssetCategory> {
  override collectionName: string = 'asset-categories';
}

@Injectable()
export class AssetRequestsService extends BaseService<IRequestAsset> {
  override collectionName: string = 'asset-requests';
}
