<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Quota
 *
 * @property int $id
 * @property int $employee_id
 * @property int $monthly_quota
 * @property int $remaining_quota
 * @property string $month
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Quota newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Quota newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Quota query()
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereMonthlyQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereRemainingQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Quota whereUpdatedAt($value)
 * @method static \Database\Factories\QuotaFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Quota extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'monthly_quota',
        'remaining_quota',
        'month',
    ];

    /**
     * Get the employee that owns the quota.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}